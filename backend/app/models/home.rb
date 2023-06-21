# frozen_string_literal: true

class Home < ApplicationRecord
  has_many :survey_visits, dependent: nil
  belongs_to :assignment, optional: true

  # Ensure uniqueness for (assignment_id, visit_order)
  # excepting null values
  validates :visit_order, uniqueness: { scope: :assignment_id }, allow_nil: true

  # Ensure visit_order has a value iff assignment_id does
  validates :visit_order, presence: true, if: :assignment_id
  validates :assignment_id, presence: true, if: :visit_order

  def visited?
    !survey_visits.empty?
  end
end
