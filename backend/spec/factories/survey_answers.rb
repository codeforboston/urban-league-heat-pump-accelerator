# frozen_string_literal: true

FactoryBot.define do
  factory :survey_answer do
    answer { 'MyText' }
    survey_response
    survey_question
  end
end
