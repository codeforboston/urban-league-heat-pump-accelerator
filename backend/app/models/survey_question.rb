# frozen_string_literal: true

class SurveyQuestion < ApplicationRecord
  belongs_to :survey
  enum response_type: { radio: 0, text: 1, email: 2, tel: 3, checkbox: 4 }
  has_many :localized_survey_questions, dependent: nil
  accepts_nested_attributes_for :localized_survey_questions

  validates :display_order, uniqueness: { scope: :survey_id }

  def text(language_code, format)
    lsq = localized_survey_questions.find_by(language_code: language_code, format: format)

    raise StandardError, "Survey question #{id} does not have localization '#{language_code}'" if lsq.nil?

    lsq.text
  end

  def response_options(language_code, format)
    lsq = localized_survey_questions.find_by(language_code: language_code, format: format)

    raise StandardError, "Survey question #{id} does not have localization '#{language_code}'" if lsq.nil?

    lsq.response_options
  end
end
