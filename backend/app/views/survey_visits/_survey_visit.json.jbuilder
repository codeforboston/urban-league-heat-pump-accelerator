# frozen_string_literal: true

json.extract! survey_visit, :id, :surveyor_id, :home_id, :created_at, :updated_at
json.url survey_visit_url(survey_visit, format: :json)
