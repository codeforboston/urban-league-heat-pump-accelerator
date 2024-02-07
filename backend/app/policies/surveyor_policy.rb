# frozen_string_literal: true

class SurveyorPolicy < ApplicationPolicy
  attr_reader :user, :record

  def index?
    user&.admin?
  end

  def show?
    user&.admin? || record == user&.surveyor
  end

  def create?
    true
  end

  def new?
    create?
  end

  def update?
    user&.admin? || record == user&.surveyor
  end

  def edit?
    update?
  end

  def destroy?
    user&.admin?
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      return unless user&.admin?

      scope.all
    end

    private

    attr_reader :user, :scope
  end
end
