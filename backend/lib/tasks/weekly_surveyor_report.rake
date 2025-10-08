# frozen_string_literal: true

namespace :reports do
  desc 'Generate and send weekly surveyor report for the previous week (Sunday-Saturday)'
  task send_weekly_surveyor_report: :environment do
    puts 'Generating weekly surveyor report...'

    start_date = Date.current.beginning_of_week(:sunday) - 1.week
    end_date = start_date + 6.days

    puts "Report period: #{start_date} to #{end_date}"

    generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
    csv_data = generator.generate

    puts "CSV generated with #{csv_data.lines.count - 1} surveyors"

    WeeklySurveyorReportMailer.weekly_report(
      csv_data: csv_data,
      start_date: start_date,
      end_date: end_date
    ).deliver_now

    puts 'Weekly surveyor report sent successfully!'
  rescue StandardError => e
    puts "Error generating or sending weekly surveyor report: #{e.message}"
    puts e.backtrace.join("\n")
    raise
  end
end
