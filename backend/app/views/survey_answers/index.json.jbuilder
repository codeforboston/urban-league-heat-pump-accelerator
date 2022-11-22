# frozen_string_literal: true

json.array! @survey_answers, partial: 'survey_answers/survey_answer', as: :survey_answer
