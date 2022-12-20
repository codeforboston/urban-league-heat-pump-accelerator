# frozen_string_literal: true

FactoryBot.define do
  factory :survey_response do
    survey
    user
  end
end
