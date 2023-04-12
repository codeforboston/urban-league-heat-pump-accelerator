# frozen_string_literal: true

class Assignment < ApplicationRecord
  has_and_belongs_to_many :surveyors
  has_many :homes, dependent: nil
end
