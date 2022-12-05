# frozen_string_literal: true

class Surveyor < ApplicationRecord
  belongs_to :user

  validates_presence_of :firstname
  validates_presence_of :lastname
  validates_presence_of :email
  validates_presence_of :phone
  validates_presence_of :street_address
  validates_presence_of :geocode
  validates_presence_of :city
  validates_presence_of :zipcode
  validates_presence_of :state
  validates_presence_of :role
  validates_presence_of :status
end
