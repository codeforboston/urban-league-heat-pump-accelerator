# frozen_string_literal: true

class User < ApplicationRecord
  has_one :surveyor, dependent: :destroy
  enum role: [:user, :surveyor, :admin]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :user
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  def jwt_payload
    {
      'email' => email,
      'role' => surveyor&.role,
      'surveyorId' => surveyor&.id
    }
  end
end
