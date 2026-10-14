# frozen_string_literal: true

require 'rails_helper'
require 'rake'

RSpec.describe 'reports:send_weekly_surveyor_report', type: :task do
  before(:all) do
    Rake.application.rake_require 'tasks/weekly_surveyor_report'
    Rake::Task.define_task(:environment)
  end

  let(:task) { Rake::Task['reports:send_weekly_surveyor_report'] }

  before do
    task.reenable
  end

  it 'generates and sends the weekly report' do
    allow(WeeklySurveyorReportGenerator).to receive(:new).and_call_original
    allow_any_instance_of(WeeklySurveyorReportGenerator).to receive(:generate).and_return('CSV data')
    allow(WeeklySurveyorReportMailer).to receive(:weekly_report).and_call_original
    allow_any_instance_of(ActionMailer::MessageDelivery).to receive(:deliver_now)

    expect { task.invoke }.to output(/Generating weekly surveyor report/).to_stdout

    expect(WeeklySurveyorReportGenerator).to have_received(:new).with(
      start_date: kind_of(Date),
      end_date: kind_of(Date)
    )
    expect(WeeklySurveyorReportMailer).to have_received(:weekly_report)
  end

  it 'uses the previous week date range (Sunday to Saturday)' do
    # Freeze time to a specific Monday
    Timecop.freeze(Date.new(2025, 10, 13)) do # Monday, Oct 13
      generator_double = instance_double(WeeklySurveyorReportGenerator)
      allow(WeeklySurveyorReportGenerator).to receive(:new).and_return(generator_double)
      allow(generator_double).to receive(:generate).and_return('CSV data')
      allow(WeeklySurveyorReportMailer).to receive(:weekly_report).and_call_original
      allow_any_instance_of(ActionMailer::MessageDelivery).to receive(:deliver_now)

      task.invoke

      # Previous week should be Sunday Oct 5 to Saturday Oct 11
      expect(WeeklySurveyorReportGenerator).to have_received(:new).with(
        start_date: Date.new(2025, 10, 5),
        end_date: Date.new(2025, 10, 11)
      )
    end
  end

  it 'counts Saturday evening visits in Eastern time when run Sunday morning' do
    surveyor = create(:surveyor)
    eastern = ActiveSupport::TimeZone['Eastern Time (US & Canada)']
    # 9 PM Saturday Eastern is already Sunday in UTC
    create(:survey_visit, surveyor: surveyor, created_at: eastern.local(2025, 10, 11, 21))
    allow(WeeklySurveyorReportMailer).to receive(:weekly_report).and_call_original
    allow_any_instance_of(ActionMailer::MessageDelivery).to receive(:deliver_now)

    Timecop.freeze(eastern.local(2025, 10, 12, 8)) { task.invoke }

    expect(WeeklySurveyorReportMailer).to have_received(:weekly_report) do |csv_data:, start_date:, end_date:|
      expect([start_date, end_date]).to eq([Date.new(2025, 10, 5), Date.new(2025, 10, 11)])
      expect(CSV.parse(csv_data, headers: true).first['Saturday Start']).to eq('09:00 PM')
    end
  end

  it 'outputs success message after sending' do
    allow_any_instance_of(WeeklySurveyorReportGenerator).to receive(:generate).and_return('CSV data')
    allow(WeeklySurveyorReportMailer).to receive(:weekly_report).and_call_original
    allow_any_instance_of(ActionMailer::MessageDelivery).to receive(:deliver_now)

    expect { task.invoke }.to output(/Weekly surveyor report sent successfully/).to_stdout
  end

  it 'handles errors gracefully' do
    allow_any_instance_of(WeeklySurveyorReportGenerator).to receive(:generate)
      .and_raise(StandardError.new('Test error'))

    expect { task.invoke }.to raise_error(StandardError, 'Test error')
      .and output(/Error generating or sending weekly surveyor report/).to_stdout
  end
end
