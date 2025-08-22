# rubocop:disable Metrics/AbcSize
# rubocop:disable Metrics/CyclomaticComplexity
# rubocop:disable Metrics/MethodLength
# rubocop:disable Metrics/PerceivedComplexity
# rubocop:disable Metrics/ModuleLength

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

    # Seed offline English survey questions
    survey = Survey.first
    map_of_survey_question_ids = {}

    SmarterCSV.process(File.join(path, 'survey_questions/en_offline.csv'), options) do |chunk|
      chunk.each do |data_hash|
        fixed_data_hash = {
          display_order: data_hash[:display_order],
          response_type: data_hash[:response_type],
          localized_survey_questions: [
            LocalizedSurveyQuestion.new({
                                          text: data_hash[:text],
                                          response_options: parse_response_options(data_hash[:response_options]),
                                          language_code: 'en',
                                          survey_mode: 'offline'
                                        })
          ]
        }
        question = SurveyQuestion.new(fixed_data_hash)
        question.survey = survey
        question.save!

        map_of_survey_question_ids[question.display_order] = question.id
      end
    end

    # Seed online localized survey questions
    language_codes = Dir.entries("#{path}/survey_questions/").map do |file_name|
      file_match = file_name.match(/^(?<language_code>\w{2})_online.csv$/)
      file_match[:language_code] if file_match
    end.compact

    language_codes.each do |language_code|
      SmarterCSV.process(File.join(path, "survey_questions/#{language_code}_online.csv"), options) do |chunk|
        chunk.each do |data_hash|
          question_id = map_of_survey_question_ids[data_hash[:display_order]]

          LocalizedSurveyQuestion.create!({
                                            text: data_hash[:text],
                                            response_options: parse_response_options(data_hash[:response_options]),
                                            language_code: language_code,
                                            survey_mode: 'online',
                                            survey_question_id: question_id
                                          })
        end
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
        next if home.street_number.blank?

        home.state = 'MA' if home.state.blank?
        home.zip_code = "0#{home.zip_code}" if home.zip_code.length == 4

        # For performance, lookup assignment id without loading Assignment model
        assignment_id = Assignment.where(cluster_id: data_hash[:cluster]).pick(:id)
        home.assignment_id = assignment_id

        home.save!
      end
    end
  end

  def self.normalize_home_addresses(normalized_addresses)
    options = { downcase_header: true, verbose: true }

    # Normalize home addresses or destroy
    SmarterCSV.process(File.join(normalized_addresses), options) do |chunk|
      chunk.each do |data_hash|
        home = Home.find_by(id: data_hash[:home_id])

        if home.nil?
          raise StandardError, "Normalized Address Data misaligned: \n" \
            "Could not find home with id #{data_hash[:home_id]}"
        end

        # Double check correct home, ids could be misaligned
        home_original_address = "#{home.street_number} #{home.street_name}, #{home.city}, MA #{home.zip_code}"
        data_original_address = data_hash[:original_address]

        if home_original_address != data_original_address
          raise StandardError, "Normalized Address Data misaligned: \n" \
            "Home id: #{home.id}\nHome address: #{home_original_address}\nCSV address: #{data_original_address}"
        end

        if data_hash[:error].present?
          home.destroy!
        else
          home.update!(street_name: data_hash[:normalized_street_name], city: data_hash[:normalized_city])
        end
      end
    end
  end

  def self.parse_response_options(response_options_str)
    if response_options_str.nil?
      []
    else
      response_options_str.split('/', -1)
    end
  end
end

# rubocop:enable Metrics/AbcSize
# rubocop:enable Metrics/CyclomaticComplexity
# rubocop:enable Metrics/MethodLength
# rubocop:enable Metrics/PerceivedComplexity
# rubocop:enable Metrics/ModuleLength
