# frozen_string_literal: true

json.extract! survey_response, :id, :survey_id, :created_at, :updated_at
json.url survey_response_url(survey_response, format: :json)
