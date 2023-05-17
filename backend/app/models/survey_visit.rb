# frozen_string_literal: true

class SurveyVisit < ApplicationRecord
  belongs_to :user
  belongs_to :home
  has_one :survey_response
  accepts_nested_attributes_for :survey_response
end
