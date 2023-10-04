# frozen_string_literal: true

# (survey.survey_questions.sort_by do |el| el[:display_order]) do |sq|
# @survey.survey_questions.sort_by do |el| el[:display_order])

json.extract! survey, :id, :title, :updated_at
json.survey_questions @survey.survey_questions.sort_by(&:display_order) do |sq|
  json.id sq.id
  json.display_order sq.display_order
  json.response_type sq.response_type
  json.question sq.text(@language_code)
end
json.url survey_url(survey, format: :json)


# json.attachments @message.attachments do |attachment|
#   json.filename attachment.filename
#   json.url url_for(attachment)
# end
