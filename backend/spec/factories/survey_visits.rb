# frozen_string_literal: true

FactoryBot.define do
  factory :survey_visit do
    user
    completed { false }
    home
  end
end
