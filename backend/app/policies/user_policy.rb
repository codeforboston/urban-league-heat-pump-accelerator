# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user, :record

  def create?
    # Need to fix authentication issues across all endpoints
    true
  end
end
