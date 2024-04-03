# frozen_string_literal: true

class Surveyor < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :assignments

  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, presence: true
  validates :phone, presence: true
  validates :street_address, presence: true
  validates :geocode, presence: true
  validates :city, presence: true
  validates :zipcode, presence: true
  validates :state, presence: true
  validates :status, presence: true
end
