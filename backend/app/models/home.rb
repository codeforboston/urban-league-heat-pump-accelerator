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

  before_save :update_canonicalized

  after_save do
    CanonicalizeAddressJob.perform_later id unless canonicalized?
  end

  protected

  def update_canonicalized
    # If we change anything in the address,
    # we need to redo the canonicalization.
    unless changes.keys.intersection(%w[street_number street_name unit_number city state
                                        zip_code]).empty?
      self.canonicalized = false
    end
  end
end
