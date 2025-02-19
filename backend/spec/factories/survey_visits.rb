# frozen_string_literal: true

FactoryBot.define do
  factory :survey_visit do
    home
    latitude { '42.3281053' }
    longitude { '-71.08229235' }
  end
end
