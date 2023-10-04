# frozen_string_literal: true

class SurveyQuestion < ApplicationRecord
  belongs_to :survey
  enum response_type: { radio: 0, text: 1 }
  has_many :localized_survey_questions
  accepts_nested_attributes_for :localized_survey_questions

  validates :display_order, uniqueness: { scope: :survey_id }

  after_initialize do
    @language_code ||= 'en'
  end

  def text
    localized_survey_questions.find_by(language_code: @language_code).text
  end

  def response_options
    localized_survey_questions.find_by(language_code: @language_code).response_options
  end
end
