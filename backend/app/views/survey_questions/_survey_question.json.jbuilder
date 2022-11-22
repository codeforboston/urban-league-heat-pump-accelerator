json.extract! survey_question, :id, :text, :response_type, :response_options, :survey_id, :created_at, :updated_at
json.url survey_question_url(survey_question, format: :json)
