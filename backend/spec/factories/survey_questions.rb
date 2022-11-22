FactoryBot.define do
  factory :survey_question do
    text { 'Do you want a heat pump?' }
    response_type { :radio }
    response_options { %w[Yes No Maybe] }
    survey
  end
end
