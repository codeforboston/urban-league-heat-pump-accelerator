# frozen_string_literal: true

class SurveyResponse < ApplicationRecord
  SUPPORTED_LANGUAGE_CODES = %w[en es ht pt].freeze

  belongs_to :survey
  belongs_to :survey_visit
  has_many :survey_answers, dependent: :destroy
  accepts_nested_attributes_for :survey_answers

  validates :language_code, inclusion: { in: SUPPORTED_LANGUAGE_CODES }, allow_nil: true
end
