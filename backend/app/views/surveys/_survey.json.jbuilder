# frozen_string_literal: true

json.extract! survey, :id, :title
json.survey_questions do
  json.array!(survey.survey_questions.sort_by do |el|
                el[:display_order]
              end, :id, :display_order, :text, :response_type, :response_options)
end
json.url survey_url(survey, format: :json)
