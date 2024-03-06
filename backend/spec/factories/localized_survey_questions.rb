FactoryBot.define do
  factory :localized_survey_question do
    language_code { "en" }
    text { "Do you like heat pumps?" }
    response_options { %w[yes no maybe] }
    survey_question
  end
end