# frozen_string_literal: true

class CsvExporter
  def initialize(survey:)
    @survey = survey
  end

  def run
    file = Tempfile.new('heat_pump_csv_export')

    begin
      write_csv(file.path)

      file.rewind
      file.read
    ensure
      file.close
      file.unlink
    end
  end

  private

  def write_csv(file_path)
    csv_options = { map_headers: CsvExportHelper.csv_headers(@survey) }

    SmarterCSV.generate(file_path, csv_options) do |writer|
      included_relations = [:surveyor, { home: [{ assignment: [:surveyors] }], survey_response: [:survey_answers] }]

      SurveyVisit.includes(included_relations).find_in_batches do |batch|
        batch.each do |survey_visit|
          write_survey_visit(writer, survey_visit)
        end
      end

      Home.includes(assignment: [:surveyors]).where.not(id: SurveyVisit.pluck(:home_id)).find_in_batches do |batch|
        batch.each do |home|
          write_home(writer, home)
        end
      end
    end
  end

  def write_survey_visit(writer, survey_visit)
    writer << CsvExportHelper.survey_visit_hash(survey_visit).merge({ successful_export: 'Yes' })
  rescue StandardError => e
    Rails.logger.error "Error exporting CSV survey visit #{survey_visit.id}: #{e}"

    writer << {
      survey_visit_id: survey_visit.id,
      successful_export: 'No'
    }
  end

  def write_home(writer, home)
    writer << CsvExportHelper.home_hash(home).merge({ successful_export: 'Yes' })
  rescue StandardError => e
    Rails.logger.error "Error exporting CSV home #{home.id}: #{e}"

    writer << {
      home_id: home.id,
      successful_export: 'No'
    }
  end
end
