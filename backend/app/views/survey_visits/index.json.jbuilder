# frozen_string_literal: true

json.array! @survey_visits, partial: 'survey_visits/survey_visit', as: :survey_visit
