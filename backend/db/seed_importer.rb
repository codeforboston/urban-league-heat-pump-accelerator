# rubocop:disable Metrics/AbcSize
# rubocop:disable Metrics/CyclomaticComplexity
# rubocop:disable Metrics/MethodLength
# rubocop:disable Metrics/PerceivedComplexity

# frozen_string_literal: true

require 'smarter_csv'

#   Seed importer provides a reusable function to import a csv file
module SeedImporter
  def import_seed_data(path, clustered_ordered_parcels)
    options = { downcase_header: true, verbose: true }

    # Seed survey
    SmarterCSV.process(File.join(path, 'test_surveys.csv'), options) do |chunk|
      chunk.each do |data_hash|
        Survey.create!(data_hash)
      end
    end

    # Seed survey questions
    survey = Survey.first
    SmarterCSV.process(File.join(path, 'test_survey_questions.csv'), options) do |chunk|
      chunk.each do |data_hash|
        data_hash[:response_options] =
          (data_hash[:response_options].nil? ? [] : data_hash[:response_options].split('/', -1))
        question = SurveyQuestion.new(data_hash)
        question.survey = survey
        question.save!
      end
    end

    # Seed users and surveyors
    SmarterCSV.process(File.join(path, 'test_users.csv'), options) do |chunk|
      chunk.each do |data_hash|
        User.create!(data_hash)
      end
    end

    SmarterCSV.process(File.join(path, 'test_surveyors.csv'), options) do |chunk|
      chunk.each do |data_hash|
        surveyor = Surveyor.new(data_hash)
        surveyor.user = User.where(email: data_hash[:email]).first
        surveyor.save!
      end
    end

    # Seed assignments
    # This is slightly inelegant, but first goes through the dummy data
    # and ensures that each assignment exists.
    # We sort the associations below.
    SmarterCSV.process(File.join(path, 'test_assignments.csv'), options) do |chunk|
      chunk.each do |data_hash|
        assignment = Assignment.where(group: data_hash[:group]).first
        assignment = Assignment.new(data_hash.except(:surveyor_email)) if assignment.nil?
        assignment.save!
      end
    end

    # Seed assignments-surveyor joins
    SmarterCSV.process(File.join(path, 'test_assignments.csv'), options) do |chunk|
      chunk.each do |data_hash|
        surveyor = Surveyor.where(email: data_hash[:surveyor_email]).first
        assignment = Assignment.where(group: data_hash[:group]).first

        assignment.surveyors.append(surveyor)
        assignment.save!
      end
    end

    # Seed homes
    SmarterCSV.process(File.join(clustered_ordered_parcels), options) do |chunk|
      chunk.each do |data_hash|
        key_mapping = {
          ST_NUM: :street_number,
          ST_NAME: :street_name,
          UNIT_NUM: :unit_number,
          CITY: :city,
          ZIPCODE: :zip_code,
          LU_DESC: :building_type,
          cluster: :assignment_id,
          order: :visit_order
        }
        home = Home.new(data_hash.transform_keys(key_mapping))
        home.save!
      end
    end
  end
end

# rubocop:enable Metrics/AbcSize
# rubocop:enable Metrics/CyclomaticComplexity
# rubocop:enable Metrics/MethodLength
# rubocop:enable Metrics/PerceivedComplexity
