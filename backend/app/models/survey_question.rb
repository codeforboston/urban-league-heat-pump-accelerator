# frozen_string_literal: true

class SurveyQuestion < ApplicationRecord
  belongs_to :survey
  enum response_type: { radio: 0, text: 1, email: 2, tel: 3, checkbox: 4 }
  has_many :localized_survey_questions, dependent: nil
  accepts_nested_attributes_for :localized_survey_questions

  validates :display_order, uniqueness: { scope: :survey_id }

  def text(language_code, survey_mode)
    lsq = find_localized_survey_question_or_raise_error(language_code, survey_mode)
    lsq.text
  end

  def response_options(language_code, survey_mode)
    lsq = find_localized_survey_question_or_raise_error(language_code, survey_mode)
    lsq.response_options
  end

  def find_localized_survey_question_or_raise_error(language_code, survey_mode)
    lsq = localized_survey_questions.find_by(language_code: language_code, survey_mode: survey_mode)

    if lsq.nil?
      raise StandardError, "Survey question #{id} does not have localization '#{language_code}'" \
        " with survey mode '#{survey_mode}'"
    end

    lsq
  end
end
