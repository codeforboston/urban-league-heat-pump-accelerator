# frozen_string_literal: true

class Assignment < ApplicationRecord
  belongs_to :surveyor
  has_many :homes
end
