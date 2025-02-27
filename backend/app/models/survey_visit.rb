# frozen_string_literal: true

class SurveyVisit < ApplicationRecord
  belongs_to :surveyor, optional: true
  belongs_to :home
  has_one :survey_response
  accepts_nested_attributes_for :survey_response

  def public_survey?
    surveyor_id.blank?
  end
end
