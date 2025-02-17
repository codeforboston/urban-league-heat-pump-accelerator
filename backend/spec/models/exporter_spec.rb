# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Exporter, type: :model do
  describe '#run' do
    let(:expected_standard_headers) do
      'Survey Visit ID,Home ID,Successful Export,Public Survey,Assignment ID,Assignment Surveyor IDs,' \
      'Assignment Surveyor Names,Street Number,Street Name,Unit Number,City,State,ZIP Code,Home Latitude,' \
      'Home Longitude,Survey Visit Latitude,Survey Visit Longitude,Survey Visit Time,Surveyor ID,Surveyor Name'
    end

    it 'creates a CSV with the correct headers' do
      survey = create(:survey)

      file_path = 'tmp/storage/test-export-csv-headers.csv'
      Exporter.new(survey: survey).run(file_path)

      expected = "#{expected_standard_headers}\n"

      actual = File.read(file_path)
      expect(actual).to eq(expected)
    end

    it 'creates a CSV with question headers' do
      localized_survey_question = create(:localized_survey_question, language_code: 'en-US')
      survey = localized_survey_question.survey_question.survey

      file_path = 'tmp/storage/test-export-csv-headers-with-questions.csv'
      Exporter.new(survey: survey).run(file_path)

      expected = "#{expected_standard_headers},\"1. Do you want a heat pump?\"\n"

      actual = File.read(file_path)
      expect(actual).to eq(expected)
    end

    it 'exports homes that have no assignment and no survey visits' do
      survey = create(:survey)
      home = create(:home, street_number: '203', street_name: 'Main', unit_number: '3',
                           city: 'Somerville', state: 'MA', zip_code: '01234', latitude: '42.32811808',
                           longitude: '-71.08244678')

      file_path = 'tmp/storage/test-export-csv-homes-no-assignment.csv'
      Exporter.new(survey: survey).run(file_path)

      expected = expected_standard_headers + "\n" \
        ",#{home.id},Yes,,,,,203,Main,3,Somerville,MA,01234,42.32811808,-71.08244678,,,,,\n"

      actual = File.read(file_path)
      expect(actual).to eq(expected)
    end

    it 'exports homes that have an assignment' do
      survey = create(:survey)
      assignment = create(:assignment)
      home = create(:home, assignment: assignment, visit_order: 1)

      file_path = 'tmp/storage/test-export-csv-homes-with-assignment.csv'
      Exporter.new(survey: survey).run(file_path)

      expected = expected_standard_headers + "\n" \
        ",#{home.id},Yes,,#{assignment.id},,,1,Broadway,106,Cambridge,MA,02139,42.32603453,-71.08999264,,,,,\n"

      actual = File.read(file_path)
      expect(actual).to eq(expected)
    end

    it 'exports homes that have an assignment with a surveyor' do
      survey = create(:survey)
      assignment = create(:assignment)
      home = create(:home, assignment: assignment, visit_order: 1)
      surveyor = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
      assignment.update!(surveyors: [surveyor])

      file_path = 'tmp/storage/test-export-csv-homes-with-assignment-with-a-surveyor.csv'
      Exporter.new(survey: survey).run(file_path)

      expected = expected_standard_headers + "\n,#{home.id},Yes,,#{assignment.id}," \
        "#{surveyor.id},Luna Peters,1,Broadway,106,Cambridge,MA,02139,42.32603453,-71.08999264,,,,,\n"

      actual = File.read(file_path)
      expect(actual).to eq(expected)
    end

    it 'exports homes that have an assignment with multiple surveyors' do
      survey = create(:survey)
      assignment = create(:assignment)
      create(:home, assignment: assignment, visit_order: 1)

      surveyor1 = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
      surveyor2 = create(:surveyor, firstname: 'Tina', lastname: 'Garcia')
      assignment.update!(surveyors: [surveyor1, surveyor2])

      file_path = 'tmp/storage/test-export-csv-homes-with-assignment-with-multiple-surveyors.csv'
      Exporter.new(survey: survey).run(file_path)

      actual = File.read(file_path)
      surveyor_names_included = actual.include?(',"Tina Garcia,Luna Peters",') ||
                                actual.include?(',"Luna Peters,Tina Garcia",')
      surveyor_ids_included = actual.include?(",\"#{surveyor1.id},#{surveyor2.id}\",") ||
                              actual.include?(",\"#{surveyor2.id},#{surveyor1.id}\",")

      expect(surveyor_names_included).to eq(true)
      expect(surveyor_ids_included).to eq(true)
    end

    it 'exports survey visits with no surveyor' do
      freeze_time = Time.utc(2025, 2, 13, 17, 30, 20)

      # Freeze time so we can test that survey visit created_at time is exported correctly
      Timecop.freeze(freeze_time) do
        localized_survey_question = create(:localized_survey_question, language_code: 'en-US')
        survey_question = localized_survey_question.survey_question
        survey = survey_question.survey

        survey_response = create(:survey_response, survey: survey)
        create(:survey_answer, survey_question: survey_question, answer: 'Yes I would love a heat pump',
                               survey_response: survey_response)

        survey_visit = survey_response.survey_visit

        home = survey_visit.home

        file_path = 'tmp/storage/test-export-csv-survey-visit-no-surveyor.csv'
        Exporter.new(survey: survey).run(file_path)

        expected = expected_standard_headers + ",\"1. Do you want a heat pump?\"\n" \
          "#{survey_visit.id},#{home.id},Yes,Yes,,,,1,Broadway,106,Cambridge,MA,02139," \
          '42.32603453,-71.08999264,42.3281053,-71.08229235,2025-02-13 12:30:20 -0500,' \
          ",,Yes I would love a heat pump\n"

        actual = File.read(file_path)
        expect(actual).to eq(expected)
      end
    end

    it 'exports survey visits with a surveyor' do
      freeze_time = Time.utc(2025, 2, 13, 17, 30, 20)

      # Freeze time so we can test that survey visit created_at time is exported correctly
      Timecop.freeze(freeze_time) do
        localized_survey_question = create(:localized_survey_question, language_code: 'en-US')
        survey_question = localized_survey_question.survey_question
        survey = survey_question.survey

        assignment = create(:assignment)
        home = create(:home, assignment: assignment, visit_order: 1)
        surveyor = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
        assignment.update!(surveyors: [surveyor])

        survey_visit = create(:survey_visit, surveyor: surveyor, home: home)
        survey_response = create(:survey_response, survey: survey, survey_visit: survey_visit)
        create(:survey_answer, survey_question: survey_question, answer: 'Yes I would love a heat pump',
                               survey_response: survey_response)

        file_path = 'tmp/storage/test-export-csv-survey-visit-with-surveyors.csv'
        Exporter.new(survey: survey).run(file_path)

        expected = expected_standard_headers + ",\"1. Do you want a heat pump?\"\n" \
          "#{survey_visit.id},#{home.id},Yes,No,#{assignment.id},#{surveyor.id},Luna Peters," \
          '1,Broadway,106,Cambridge,MA,02139,42.32603453,-71.08999264,42.3281053,-71.08229235,' \
          "2025-02-13 12:30:20 -0500,#{surveyor.id},Luna Peters,Yes I would love a heat pump\n"

        actual = File.read(file_path)
        expect(actual).to eq(expected)
      end
    end
  end
end
