# frozen_string_literal: true
# TODO: Do we need to add text(language_code) to this somehow?
# TODO: :response_options might need a language code added to it as well
json.extract! survey_question, :id, :response_type, :survey_id, :created_at, :updated_at
json.url survey_question_url(survey_question, format: :json)
