# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyVisit, type: :model do
  context 'calculates distance_from_home' do
    let(:home) { create(:home, latitude: '42.3741048', longitude: '-71.126252') }

    it 'performs the calculation before creating the survey visit' do
      survey_visit = build(:survey_visit, home: home, latitude: '42.3742039', longitude: '-71.1248546')
      survey_visit.save!
      survey_visit.distance_from_home = 0.07165586397914082
    end

    it 'skips calculation if latitude and longitude are blank' do
      survey_visit = build(:survey_visit, home: home, latitude: nil, longitude: nil)
      survey_visit.save!
      survey_visit.distance_from_home = nil
    end
  end

  context 'distance_from_home_rounded' do
    it 'returns nil if distance_from_home is nil' do
      survey_visit = build(:survey_visit, distance_from_home: nil)
      expect(survey_visit.distance_from_home_rounded).to be_nil
    end

    it 'returns distance_from_home rounded if present' do
      survey_visit = build(:survey_visit, distance_from_home: 4.23456553452432)
      expect(survey_visit.distance_from_home_rounded).to eq(4.23457)
    end
  end
end
