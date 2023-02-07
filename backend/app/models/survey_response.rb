# frozen_string_literal: true

class SurveyResponse < ApplicationRecord
  belongs_to :survey
  belongs_to :survey_visit
end
