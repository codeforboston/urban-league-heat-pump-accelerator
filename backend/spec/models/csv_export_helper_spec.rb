# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CsvExportHelper, type: :model do
  describe 'self.home_hash' do
    it 'builds a hash for a home' do
      home = create(:home, street_number: '203', street_name: 'Main', unit_number: '3',
                           city: 'Somerville', state: 'MA', zip_code: '01234', latitude: '42.32811808',
                           longitude: '-71.08244678')

      actual = CsvExportHelper.home_hash(home)
      expected = {
        home_id: home.id,
        home_street_number: '203',
        home_street_name: 'Main',
        home_unit_number: '3',
        home_city: 'Somerville',
        home_state: 'MA',
        home_zip_code: '01234',
        home_latitude: '42.32811808',
        home_longitude: '-71.08244678'
      }

      expect(actual).to eq(expected)
    end

    it 'builds a hash for a home with an assignment' do
      assignment = create(:assignment)
      home = create(:home, assignment: assignment, visit_order: 1)

      actual = CsvExportHelper.home_hash(home)[:assignment_id]

      expect(actual).to eq(assignment.id)
    end

    it 'builds a hash for a home with an assignment with a surveyor' do
      assignment = create(:assignment)
      home = create(:home, assignment: assignment, visit_order: 1)
      surveyor = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
      assignment.update!(surveyors: [surveyor])

      actual = CsvExportHelper.home_hash(home)

      expect(actual[:assignment_surveyor_ids]).to eq(surveyor.id.to_s)
      expect(actual[:assignment_surveyor_names]).to eq('Luna Peters')
    end

    it 'builds a hash for a home with an assignment with multiple surveyors' do
      assignment = create(:assignment)
      home = create(:home, assignment: assignment, visit_order: 1)

      surveyor1 = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
      surveyor2 = create(:surveyor, firstname: 'Tina', lastname: 'Garcia')
      assignment.update!(surveyors: [surveyor1, surveyor2])

      actual = CsvExportHelper.home_hash(home)

      expected_name_options = ['Tina Garcia,Luna Peters', 'Luna Peters,Tina Garcia']
      expect(actual[:assignment_surveyor_names]).to be_in(expected_name_options)

      expected_id_options = ["#{surveyor1.id},#{surveyor2.id}", "#{surveyor2.id},#{surveyor1.id}"]
      expect(actual[:assignment_surveyor_ids]).to be_in(expected_id_options)
    end
  end

  describe 'self.survey_visit_hash' do
    it 'builds a hash for a survey visit' do
      localized_survey_question = create(:localized_survey_question, language_code: 'en')
      survey_question = localized_survey_question.survey_question
      survey = survey_question.survey
      home = create(:home)

      freeze_time = Time.utc(2025, 2, 13, 17, 30, 20)

      # Freeze time so we can test survey_visit created_at
      Timecop.freeze(freeze_time) do
        @survey_visit = create(:survey_visit, home: home, latitude: '42.3261', longitude: '-71.0898')
      end

      survey_response = create(:survey_response, survey: survey, survey_visit: @survey_visit, language_code: 'es')
      create(:survey_answer, survey_question: survey_question, answers: ['Yes I would love a heat pump'],
                             survey_response: survey_response)

      actual = CsvExportHelper.survey_visit_hash(@survey_visit)
      expected = {
        survey_visit_id: @survey_visit.id,
        public_survey: 'Yes',
        survey_visit_latitude: '42.3261',
        survey_visit_longitude: '-71.0898',
        survey_visit_time: freeze_time.in_time_zone('Eastern Time (US & Canada)'),
        survey_visit_distance_from_home: 0.01083,
        surveyor_id: nil,
        surveyor_name: nil,
        home_id: home.id,
        home_street_number: '1',
        home_street_name: 'Broadway',
        home_unit_number: '106',
        home_city: 'Cambridge',
        home_state: 'MA',
        home_zip_code: '02139',
        home_latitude: '42.32603453',
        home_longitude: '-71.08999264',
        survey_response_language_code: 'es',
        "question_#{survey_question.id}".to_sym => 'Yes I would love a heat pump'
      }

      expect(actual).to eq(expected)
    end

    it 'builds a hash for a survey visit with a surveyor' do
      localized_survey_question = create(:localized_survey_question, language_code: 'en')
      survey_question = localized_survey_question.survey_question
      survey = survey_question.survey

      assignment = create(:assignment)
      home = create(:home, assignment: assignment, visit_order: 1)
      @surveyor = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
      assignment.update!(surveyors: [@surveyor])

      @survey_visit = create(:survey_visit, home: home, surveyor: @surveyor, latitude: '33.333', longitude: '44.444')
      create(:survey_response, survey: survey, survey_visit: @survey_visit)

      actual = CsvExportHelper.survey_visit_hash(@survey_visit)
      expect(actual[:public_survey]).to eq('No')
      expect(actual[:surveyor_id]).to eq(@surveyor.id)
      expect(actual[:surveyor_name]).to eq('Luna Peters')
    end
  end

  describe 'self.csv_headers' do
    it 'builds the hash of csv headers with questions' do
      localized_question = create(:localized_survey_question, language_code: 'en', text: 'Heat pumps amirite?')
      survey_question = localized_question.survey_question
      survey = survey_question.survey

      actual = CsvExportHelper.csv_headers(survey)
      expected = {
        survey_visit_id: 'Survey Visit ID',
        home_id: 'Home ID',
        successful_export: 'Successful Export',
        public_survey: 'Public Survey',
        assignment_id: 'Assignment ID',
        assignment_surveyor_ids: 'Assignment Surveyor IDs',
        assignment_surveyor_names: 'Assignment Surveyor Names',
        home_street_number: 'Street Number',
        home_street_name: 'Street Name',
        home_unit_number: 'Unit Number',
        home_city: 'City',
        home_state: 'State',
        home_zip_code: 'ZIP Code',
        home_latitude: 'Home Latitude',
        home_longitude: 'Home Longitude',
        survey_visit_latitude: 'Survey Visit Latitude',
        survey_visit_longitude: 'Survey Visit Longitude',
        survey_visit_time: 'Survey Visit Time',
        survey_visit_distance_from_home: 'Survey Visit Distance From Home (miles)',
        surveyor_id: 'Surveyor ID',
        surveyor_name: 'Surveyor Name',
        survey_response_language_code: 'Language Code',
        "question_#{survey_question.id}".to_sym => '"1. Heat pumps amirite?"'
      }

      expect(actual).to eq(expected)
    end
  end
end
