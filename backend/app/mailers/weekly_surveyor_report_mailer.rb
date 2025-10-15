# frozen_string_literal: true

class WeeklySurveyorReportMailer < ApplicationMailer
  default from: 'noreply@bostonhpa.org'

  def weekly_report(csv_data:, start_date:, end_date:, recipients: ['help@bostonhpa.org'])
    @start_date = start_date
    @end_date = end_date

    attachments["surveyor_report_#{start_date}_to_#{end_date}.csv"] = {
      mime_type: 'text/csv',
      content: csv_data
    }

    mail(
      to: recipients,
      subject: "Boston Heat Pump Accelerator Report for Week #{start_date.strftime('%m/%d/%Y')} to #{end_date.strftime('%m/%d/%Y')}" # rubocop:disable Layout/LineLength
    )
  end
end
