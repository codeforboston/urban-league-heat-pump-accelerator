# frozen_string_literal: true

class SurveyResponse < ApplicationRecord
  belongs_to :survey
  belongs_to :user
  belongs_to :survey_visit
  belongs_to :home
end
