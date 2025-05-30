# frozen_string_literal: true

require 'geocoder'

class SurveyVisit < ApplicationRecord
  belongs_to :surveyor, optional: true
  belongs_to :home
  has_one :survey_response
  accepts_nested_attributes_for :survey_response
  before_create :calculate_distance_from_home

  def public_survey?
    surveyor_id.blank?
  end

  def calculate_distance_from_home
    return unless latitude.present? && longitude.present? && home.latitude.present? && home.longitude.present?

    point1 = [latitude, longitude]
    point2 = [home.latitude, home.longitude]

    self.distance_from_home = Geocoder::Calculations.distance_between(point1, point2)
  end
end
