# rubocop:disable Metrics/AbcSize
# rubocop:disable Metrics/CyclomaticComplexity
# rubocop:disable Metrics/MethodLength
# rubocop:disable Metrics/PerceivedComplexity

# frozen_string_literal: true

require 'smarter_csv'

#   Seed importer provides a reusable function to import a csv file
module SeedImporter
  def self.import_seed_data(path, clustered_ordered_parcels)
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
        fixed_data_hash = {
          display_order: data_hash[:display_order],
          response_type: data_hash[:response_type],
          localized_survey_questions: [
            LocalizedSurveyQuestion.new({
                                          text: data_hash[:text],
                                          response_options: data_hash[:response_options],
                                          language_code: 'en-US'
                                        })
          ]
        }
        question = SurveyQuestion.new(fixed_data_hash)
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

    # Prevent SmarterCSV from converting a zipcode like "02110" to "2110"
    modified_options = options.merge(convert_values_to_numeric: { except: :zipcode })

    SmarterCSV.process(File.join(path, 'test_surveyors.csv'), modified_options) do |chunk|
      chunk.each do |data_hash|
        surveyor = Surveyor.new(data_hash)
        surveyor.user = User.where(email: data_hash[:email]).first
        surveyor.save!
      end
    end

    # Seed assignments
    SmarterCSV.process(File.join(path, 'cluster_centroids_with_regions.csv'), options) do |chunk|
      chunk.each do |data_hash|
        assignment_hash = {
          cluster_id: data_hash[:cluster],
          latitude: data_hash[:lat],
          longitude: data_hash[:lon],
          region_code: data_hash[:region]
        }

        assignment = Assignment.new(assignment_hash)
        assignment.save!
      end
    end

    # Seed homes
    SmarterCSV.process(File.join(clustered_ordered_parcels), options) do |chunk|
      chunk.each do |data_hash|
        key_mapping = {
          st_num: :street_number,
          st_name: :street_name,
          unit_num: :unit_number,
          zipcode: :zip_code,
          lu_desc: :building_type,
          order: :visit_order
        }

        home = Home.new(data_hash.transform_keys(key_mapping).slice(*Home.new.attributes.symbolize_keys.keys))
        home.state = 'MA' if home.state.blank?
        home.zip_code = "0#{home.zip_code}" if home.zip_code.length == 4

        # For performance, lookup assignment id without loading Assignment model
        assignment_id = Assignment.where(cluster_id: data_hash[:cluster]).pick(:id)
        home.assignment_id = assignment_id

        home.save!
      end
    end
  end
end

# rubocop:enable Metrics/AbcSize
# rubocop:enable Metrics/CyclomaticComplexity
# rubocop:enable Metrics/MethodLength
