# frozen_string_literal: true

class User < ApplicationRecord
  has_one :surveyor, dependent: :destroy
  enum role: { user: 0, surveyor: 1, admin: 2 }
  after_initialize :set_default_role, if: :new_record?
  after_initialize :set_random_password, if: :new_record?
  accepts_nested_attributes_for :surveyor

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
      'role' => self.role,
      'surveyorId' => surveyor&.id
    }
  end

  private

  def set_random_password
    self.password ||= SecureRandom.base64(15)
  end
end
