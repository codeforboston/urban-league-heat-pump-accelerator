# frozen_string_literal: true

require 'rails_helper'
require 'geocoder'

module TestConstants
  HOME_LAT = 42.32603453
  HOME_LONG = -71.08999264
  SURVEY_LAT = 42.3281053
  SURVEY_LONG = -71.08229235
end

RSpec.describe CsvExporter, type: :model do
  describe '#run' do
    let(:expected_standard_headers) do
      'Survey Visit ID,Home ID,Successful Export,Public Survey,Assignment ID,Assignment Surveyor IDs,' \
      'Assignment Surveyor Names,Street Number,Street Name,Unit Number,City,State,ZIP Code,Home Latitude,' \
      'Home Longitude,Survey Visit Latitude,Survey Visit Longitude,Survey Visit Time,Surveyor ID,Surveyor Name,Survey Distance'
    end

    before do
      create_test_data
    end

    it 'returns a CSV with survey visits and homes' do
      actual = CsvExporter.new(survey: @survey).run

      survey_distance_miles = Geocoder::Calculations.distance_between(
        [TestConstants::HOME_LAT, TestConstants::HOME_LONG],
        [TestConstants::SURVEY_LAT, TestConstants::SURVEY_LONG]
      )

      expected_headers = "#{expected_standard_headers},\"1. Do you want a heat pump?\"\n"
      expected_survey_visit = "#{@survey_visit.id},#{@home1.id},Yes,No,#{@assignment.id},#{@surveyor.id}," \
        "Luna Peters,1,Broadway,106,Cambridge,MA,02139,#{@TestConstants::HOME_LAT},#{@TestConstants::HOME_LONG}," \
        "#{@TestConstants::SURVEY_LAT},#{@TestConstants::SURVEY_LONG},#{@survey_distance_miles}" \
        "2025-02-13 12:30:20 -0500,#{@surveyor.id},Luna Peters,,Yes I would love a heat pump\n"
      expected_home = ",#{@home2.id},Yes,,,,,1,Broadway,106,Cambridge,MA,02139,#{@TestConstants::HOME_LAT},#{@TestConstants::HOME_LONG},,,,,,\n"

      expected = expected_headers + expected_survey_visit + expected_home
      expect(actual).to eq(expected)
    end

    it 'handles errors with survey visits and moves on' do
      allow(CsvExportHelper).to(receive(:survey_visit_hash).and_raise { StandardError.new('foobar') })

      actual = CsvExporter.new(survey: @survey).run

      expected_headers = "#{expected_standard_headers},\"1. Do you want a heat pump?\"\n"
      expected_survey_visit = "#{@survey_visit.id},,No,,,,,,,,,,,,,,,,,,\n"
      expected_home = ",#{@home2.id},Yes,,,,,1,Broadway,106,Cambridge,MA,02139,#{@TestConstants::HOME_LAT},#{@TestConstants::HOME_LONG},,,,,,\n"

      expected = expected_headers + expected_survey_visit + expected_home
      expect(actual).to eq(expected)
    end

    it 'handles errors with homes and moves on' do
      allow(CsvExportHelper).to(receive(:home_hash).and_raise { StandardError.new('foobar') })

      actual = CsvExporter.new(survey: @survey).run

      expected_headers = "#{expected_standard_headers},\"1. Do you want a heat pump?\"\n"
      expected_survey_visit = "#{@survey_visit.id},,No,,,,,,,,,,,,,,,,,,\n"
      expected_home = ",#{@home2.id},No,,,,,,,,,,,,,,,,,,\n"

      expected = expected_headers + expected_survey_visit + expected_home
      expect(actual).to eq(expected)
    end

    it 'deletes the temporary file even when there is an error' do
      file = double
      allow(file).to receive(:path).and_return('foo')
      allow(file).to receive(:close)
      allow(file).to receive(:unlink)

      allow(Tempfile).to receive(:new).and_return(file)
      allow(CsvExportHelper).to(receive(:csv_headers).and_raise { StandardError.new('foobar') })

      expect { CsvExporter.new(survey: @survey).run }.to raise_error(StandardError)
      expect(file).to have_received(:close)
      expect(file).to have_received(:unlink)
    end

    def create_test_data
      localized_survey_question = create(:localized_survey_question, language_code: 'en-US')
      survey_question = localized_survey_question.survey_question
      @survey = survey_question.survey

      @assignment = create(:assignment)
      @home1 = create(:home, assignment: @assignment, visit_order: 1)
      @home2 = create(:home)

      @surveyor = create(:surveyor, firstname: 'Luna', lastname: 'Peters')
      @assignment.update!(surveyors: [@surveyor])

      freeze_time = Time.utc(2025, 2, 13, 17, 30, 20)
      Timecop.freeze(freeze_time) { @survey_visit = create(:survey_visit, surveyor: @surveyor, home: @home1) }

      survey_response = create(:survey_response, survey: @survey, survey_visit: @survey_visit)
      create(:survey_answer, survey_question: survey_question, answer: 'Yes I would love a heat pump',
                             survey_response: survey_response)
    end
  end
end
