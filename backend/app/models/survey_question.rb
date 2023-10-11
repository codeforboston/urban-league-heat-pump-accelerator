# frozen_string_literal: true

class SurveyQuestion < ApplicationRecord
  AVAILABLE_LANGUAGES = %w[en es fr-ht pt-br].freeze
  belongs_to :survey
  enum response_type: { radio: 0, text: 1 }
  has_many :localized_survey_questions
  accepts_nested_attributes_for :localized_survey_questions

  validates :display_order, uniqueness: { scope: :survey_id }

  def text(language_code)
    raise StandardError, 'Needs language code' unless AVAILABLE_LANGUAGES.include?(language_code)

    localized_survey_questions.find_by(language_code:).text
  end

  def response_options(language_code)
    raise StandardError, 'Needs language code' unless AVAILABLE_LANGUAGES.include?(language_code)

    localized_survey_questions.find_by(language_code:).response_options
  end
end
