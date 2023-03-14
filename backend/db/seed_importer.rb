# frozen_string_literal: true

require 'smarter_csv'

#   Seed importer provides a reusable function to import a csv file
module SeedImporter
  def import_seed_data(path)
    options = { downcase_header: true, verbose: true }

    # Seed survey
    SmarterCSV.process(File.join(path, "test_surveys.csv"), options) do |chunk|
      chunk.each do |data_hash|
        Survey.create!(data_hash)
      end
    end

    # Seed survey questions
    survey = Survey.first
    SmarterCSV.process(File.join(path, "test_survey_questions.csv"), options) do |chunk|
      chunk.each do |data_hash|
        data_hash[:response_options] = if data_hash[:response_options].nil? then Array.new else data_hash[:response_options].split("/", -1) end
        question = SurveyQuestion.new(data_hash)
        question.survey = survey
        question.save!
      end
    end

    SmarterCSV.process(File.join(path, "test_seeds.csv"), options) do |chunk|
      chunk.each do |data_hash|
        PropertyAssessment.create!(data_hash)
      end
    end
  end
end
