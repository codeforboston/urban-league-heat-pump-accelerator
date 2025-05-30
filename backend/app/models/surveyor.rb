# frozen_string_literal: true

class Surveyor < ApplicationRecord
  STATUS_ACTIVE = 'active'

  belongs_to :user
  has_and_belongs_to_many :assignments

  after_initialize :set_default_status, if: :new_record?

  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, presence: true
  validates :phone, presence: true
  validates :street_address, presence: true
  validates :city, presence: true
  validates :zipcode, presence: true
  validates :state, presence: true
  validates :status, presence: true

  def full_name
    "#{firstname} #{lastname}"
  end

  private

  def set_default_status
    self.status ||= STATUS_ACTIVE
  end
end
