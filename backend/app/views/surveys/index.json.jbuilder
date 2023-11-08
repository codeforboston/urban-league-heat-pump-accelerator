# frozen_string_literal: true

json.array! @surveys do |s|
  json.id s.id
  json.title s.title
  json.updated_at s.updated_at
  json.url survey_url(s.id, format: :json)
end
