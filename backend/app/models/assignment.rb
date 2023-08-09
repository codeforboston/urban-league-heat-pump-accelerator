# frozen_string_literal: true

class Assignment < ApplicationRecord
  has_and_belongs_to_many :surveyors
  has_many :homes, dependent: nil
  validates :region_code, numericality: true

  scope :filter_by_surveyor, ->(surveyor_ids) { joins(:surveyors).where(surveyors: { id: surveyor_ids }) }
end
