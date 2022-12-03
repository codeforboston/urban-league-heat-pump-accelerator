# frozen_string_literal: true

json.array! @surveyors, partial: 'surveyors/surveyor', as: :surveyor
