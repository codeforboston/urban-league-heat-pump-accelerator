# frozen_string_literal: true

class Survey < ApplicationRecord
  has_many :survey_questions, dependent: nil
end
