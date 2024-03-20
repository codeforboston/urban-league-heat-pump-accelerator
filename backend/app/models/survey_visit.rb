# frozen_string_literal: true

class SurveyVisit < ApplicationRecord
  belongs_to :surveyor, optional: true
  belongs_to :home
  has_one :survey_response, dependent: :destroy
  accepts_nested_attributes_for :survey_response
end
