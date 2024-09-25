# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def create?
    user&.admin?
  end
end
