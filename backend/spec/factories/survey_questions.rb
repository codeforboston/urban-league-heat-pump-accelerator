# frozen_string_literal: true

FactoryBot.define do
  factory :survey_question do
    display_order { 1 }
    response_type { :radio }
    survey
  end
end
