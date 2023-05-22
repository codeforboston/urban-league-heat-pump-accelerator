# rubocop:disable Metrics/AbcSize
# rubocop:disable Metrics/CyclomaticComplexity
# rubocop:disable Metrics/MethodLength
# rubocop:disable Metrics/PerceivedComplexity

# frozen_string_literal: true

require 'smarter_csv'

#   Seed importer provides a reusable function to import a csv file
module SeedImporter
  def import_seed_data(path)
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
    SmarterCSV.process(File.join(path, 'test_homes.csv'), options) do |chunk|
      chunk.each do |data_hash|
        assignment_group = data_hash[:assignment_group]
        home = Home.new(data_hash.except(:assignment_group))
        home.assignment = Assignment.where(group: assignment_group).first
        home.save!

        # Ensure home addresses have been canonicalized for later
        CanonicalizeHomeAddressJob.perform_later home.id
      end
    end

    SmarterCSV.process(File.join(path, 'test_seeds.csv'), options) do |chunk|
      chunk.each do |data_hash|
        PropertyAssessment.create!(data_hash)
      end
    end
  end
end

# rubocop:enable Metrics/AbcSize
# rubocop:enable Metrics/CyclomaticComplexity
# rubocop:enable Metrics/MethodLength
# rubocop:enable Metrics/PerceivedComplexity
