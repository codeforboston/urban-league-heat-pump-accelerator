# frozen_string_literal: true

module Admin
  class ExportsController < ApplicationController
    def export
      @csv_exporter = CsvExporter.new(survey: Survey.last)
      authorize @csv_exporter

      csv_data = @csv_exporter.run

      respond_to do |format|
        format.csv do
          response.headers['Content-Type'] = 'text/csv'
          send_data csv_data
        end
      end
    end
  end
end
