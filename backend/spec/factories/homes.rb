# frozen_string_literal: true

FactoryBot.define do
  factory :home do
    street_number { '1' }
    street_name { 'Broadway' }
    unit_number { '106' }
    city { 'Cambridge' }
    state { 'MA' }
    zip_code { '02139' }
    building_type { 'Apartment' }

    trait :with_completed_survey_visit do
      after(:build) do |home, _evaluator|
        survey_visit = build(:survey_visit, home:)
        home.survey_visits << survey_visit
        survey_response = build(:survey_response, survey_visit:)
        survey_visit.survey_response = survey_response
      end
    end
  end
end
