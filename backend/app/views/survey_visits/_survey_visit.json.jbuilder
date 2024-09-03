# frozen_string_literal: true

json.extract! survey_visit, :id, :surveyor_id, :home_id, :created_at, :updated_at
json.url survey_visit_url(survey_visit, format: :json)
if survey_visit.surveyor_id.present?
  json.surveyor do
    json.id survey_visit.surveyor.id
    json.firstname survey_visit.surveyor.firstname
    json.lastname survey_visit.surveyor.lastname
  end
end
json.home do
  json.id survey_visit.home.id
  json.street_number survey_visit.home.street_number
  json.street_name survey_visit.home.street_name
  json.unit_number survey_visit.home.unit_number
  json.city survey_visit.home.city
  json.state survey_visit.home.state
  json.zip_code survey_visit.home.zip_code
end
if survey_visit.survey_response.present?
  json.survey_response do
    json.id survey_visit.survey_response.id
    json.survey_id survey_visit.survey_response.survey_id
    json.survey_answers survey_visit.survey_response.survey_answers do |sa|
      json.id sa.id
      json.survey_question_id sa.survey_question_id
      json.answer sa.answer
    end
  end
end
