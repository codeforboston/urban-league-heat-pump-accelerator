# frozen_string_literal: true

class SurveyResponse < ApplicationRecord
  belongs_to :survey
  belongs_to :survey_visit
  has_many :survey_answers, dependent: :destroy
  accepts_nested_attributes_for :survey_answers
end
