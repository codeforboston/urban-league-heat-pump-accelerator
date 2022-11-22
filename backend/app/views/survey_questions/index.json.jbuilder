# frozen_string_literal: true

json.array! @survey_questions, partial: 'survey_questions/survey_question', as: :survey_question
