# frozen_string_literal: true

FactoryBot.define do
  factory :localized_survey_question do
    language_code { 'en' }
    text { 'Do you want a heat pump?' }
    response_options { %w[Yes No Maybe] }
    survey_question
  end
end
