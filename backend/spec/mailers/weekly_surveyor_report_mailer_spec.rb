# frozen_string_literal: true

require 'rails_helper'

RSpec.describe WeeklySurveyorReportMailer, type: :mailer do
  describe '#weekly_report' do
    let(:csv_data) { "Surveyor,Monday Start,Monday End\nJohn Doe,✅,✅\n" }
    let(:start_date) { Date.new(2025, 10, 5) }
    let(:end_date) { Date.new(2025, 10, 11) }
    let(:recipients) { ['test@example.com'] }

    let(:mail) do
      WeeklySurveyorReportMailer.weekly_report(
        csv_data: csv_data,
        start_date: start_date,
        end_date: end_date,
        recipients: recipients
      )
    end

    it 'sends email to the specified recipients' do
      expect(mail.to).to eq(['test@example.com'])
    end

    it 'sends from the correct sender' do
      expect(mail.from).to eq(['noreply@bostonhpa.org'])
    end

    it 'has the correct subject with date range' do
      expected_subject = 'Boston Heat Pump Accelerator Report for Week 10/05/2025 to 10/11/2025'
      expect(mail.subject).to eq(expected_subject)
    end

    it 'includes the date range in the email body' do
      html_part = mail.html_part.body.decoded
      text_part = mail.text_part.body.decoded

      expect(html_part).to include('October 05, 2025')
      expect(html_part).to include('October 11, 2025')
      expect(text_part).to include('October 05, 2025')
      expect(text_part).to include('October 11, 2025')
    end

    it 'includes the legend in the email body' do
      html_part = mail.html_part.body.decoded
      text_part = mail.text_part.body.decoded

      expect(html_part).to include('✅ = On time')
      expect(text_part).to include('✅ = On time')
    end

    it 'attaches the CSV file' do
      expect(mail.attachments.size).to eq(1)
    end

    it 'names the CSV file correctly' do
      attachment = mail.attachments.first
      expected_filename = 'surveyor_report_2025-10-05_to_2025-10-11.csv'
      expect(attachment.filename).to eq(expected_filename)
    end

    it 'sets the correct MIME type for the CSV attachment' do
      attachment = mail.attachments.first
      expect(attachment.content_type).to start_with('text/csv')
    end

    it 'includes the CSV data in the attachment' do
      attachment = mail.attachments.first
      # Decode and normalize line endings
      expect(attachment.body.decoded.gsub("\r\n", "\n")).to eq(csv_data)
    end

    context 'with multiple recipients' do
      let(:recipients) { ['test1@example.com', 'test2@example.com'] }

      it 'sends email to all recipients' do
        expect(mail.to).to eq(['test1@example.com', 'test2@example.com'])
      end
    end

    context 'with default recipients' do
      let(:mail) do
        WeeklySurveyorReportMailer.weekly_report(
          csv_data: csv_data,
          start_date: start_date,
          end_date: end_date
        )
      end

      it 'uses the default recipient' do
        expect(mail.to).to eq(['help@bostonhpa.org'])
      end
    end
  end
end
