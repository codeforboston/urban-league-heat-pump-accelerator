# frozen_string_literal: true

FactoryBot.define do
  factory :survey_answer do
    survey_response
    survey_question
  end
end
