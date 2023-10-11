# frozen_string_literal: true

json.extract! survey, :id, :title, :updated_at
json.survey_questions @survey.survey_questions.sort_by(&:display_order) do |sq|
  json.id sq.id
  json.display_order sq.display_order
  json.response_type sq.response_type
  json.question sq.text(@language_code)
  json.response_options sq.response_options(@language_code)
end
json.url survey_url(survey, format: :json)
