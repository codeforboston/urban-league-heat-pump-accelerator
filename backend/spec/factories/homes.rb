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
      after(:build) do |home, evaluator|
        build_list(:survey_visit, 1, home: home)
      end
    end
  end
end
