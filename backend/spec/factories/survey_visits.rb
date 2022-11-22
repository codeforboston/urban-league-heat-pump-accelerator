FactoryBot.define do
  factory :survey_visit do
    user
    completed { false }
  end
end
