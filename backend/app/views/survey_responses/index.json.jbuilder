# frozen_string_literal: true

json.array! @survey_responses, partial: 'survey_responses/survey_response', as: :survey_response
