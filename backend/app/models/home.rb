# frozen_string_literal: true

class Home < ApplicationRecord
  has_many :survey_visits, dependent: nil
  belongs_to :assignment, optional: true

  validates :visit_order, uniqueness: { scope: :assignment_id }, allow_nil: true

  validates :visit_order, presence: true, if: :assignment_id
  validates :assignment_id, presence: true, if: :visit_order
end
