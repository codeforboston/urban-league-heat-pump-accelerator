# frozen_string_literal: true

module Admin
  class ExportsController < ApplicationController
    def export
      @exporter = Exporter.new(survey: Survey.last)
      authorize @exporter

      file_path = "tmp/storage/export-#{Time.current.strftime('%m-%d-%Y.%H.%M.%S')}.csv"
      @exporter.run(file_path)

      respond_to do |format|
        format.csv do
          response.headers['Content-Type'] = 'text/csv'
          send_data File.read(file_path)
        end
      end
    end
  end
end
