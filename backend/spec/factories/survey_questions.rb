# frozen_string_literal: true

FactoryBot.define do
  factory :survey_question do
    response_type { :radio }
    display_order { 1 }
    survey
  end
end
