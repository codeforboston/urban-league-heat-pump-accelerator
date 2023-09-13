# frozen_string_literal: true

class Home < ApplicationRecord
  has_many :survey_visits, dependent: nil
  belongs_to :assignment, optional: true

  enum status: { uncanonicalized: 0, canonicalized: 1, unrecognized: 2 }

  # Ensure uniqueness for (assignment_id, visit_order)
  # excepting null values
  validates :visit_order, uniqueness: { scope: :assignment_id }, allow_nil: true

  # Ensure visit_order has a value iff assignment_id does
  validates :visit_order, presence: true, if: :assignment_id
  validates :assignment_id, presence: true, if: :visit_order

  def visited?
    !survey_visits.empty?
  end

  def completed?
    # We consider a home completed if any of its survey_visits
    # have an associated survey_response
    survey_visits.any? { |sv| !sv.survey_response.nil? }
  end

  before_save :update_status

  after_save do
    # Wait a few seconds to ensure new record is visible in job
    CanonicalizeAddressJob.set(wait: 2.seconds).perform_later id if uncanonicalized?
  end

  protected

  def update_status
    # If we change anything in the address,
    # we need to redo the canonicalization.
    unless changes.keys.intersection(%w[street_number street_name unit_number city state
                                        zip_code]).empty?
      self.status = :uncanonicalized
    end
  end
end
