# frozen_string_literal: true

FactoryBot.define do
  factory :survey_response do
    survey
    survey_visit
    ip { "127.0.0.1" }
    recaptcha_score { "42" }
  end
end
