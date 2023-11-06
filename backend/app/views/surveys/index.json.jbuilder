# frozen_string_literal: true

json.array! @surveys, partial: 'surveys/survey', as: :survey
