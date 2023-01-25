# frozen_string_literal: true

class Home < ApplicationRecord
  has_many :survey_visits, dependent: nil
  belongs_to :assignment
end
