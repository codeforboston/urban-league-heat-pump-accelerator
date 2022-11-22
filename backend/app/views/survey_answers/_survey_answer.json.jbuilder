# frozen_string_literal: true

json.extract! survey_answer, :id, :answer, :survey_response_id, :survey_question_id, :created_at, :updated_at
json.url survey_answer_url(survey_answer, format: :json)
