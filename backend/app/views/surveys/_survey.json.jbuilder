# frozen_string_literal: true

json.extract! survey, :id, :title, :created_at, :updated_at
json.survey_questions do
  json.array!(survey.survey_questions.sort_by { |el| el[:display_order] })
end
json.url survey_url(survey, format: :json)
