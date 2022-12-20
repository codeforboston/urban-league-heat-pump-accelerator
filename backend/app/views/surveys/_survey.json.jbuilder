# frozen_string_literal: true

json.extract! survey, :id, :title, :created_at, :updated_at
json.url survey_url(survey, format: :json)
