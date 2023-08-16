# frozen_string_literal: true

json.extract! survey_visit, :id, :surveyor_id, :home_id, :created_at, :updated_at
json.url survey_visit_url(survey_visit, format: :json)
json.survey_response do
  json.id survey_visit.survey_response.id
  json.survey_id survey_visit.survey_response.survey_id
  json.survey_answers survey_visit.survey_response.survey_answers do |sa|
    json.id sa.id
    json.survey_question_id sa.survey_question_id
    json.answer sa.answer
  end
end
