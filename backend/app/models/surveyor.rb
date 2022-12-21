# frozen_string_literal: true

class Surveyor < ApplicationRecord
  belongs_to :user

  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, presence: true
  validates :phone, presence: true
  validates :street_address, presence: true
  validates :geocode, presence: true
  validates :city, presence: true
  validates :zipcode, presence: true
  validates :state, presence: true
  validates :role, presence: true
  validates :status, presence: true
end
