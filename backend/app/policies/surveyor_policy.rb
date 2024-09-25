# frozen_string_literal: true

class SurveyorPolicy < ApplicationPolicy
  attr_reader :user, :record

  def index?
    user&.admin?
  end

  def show?
    user&.admin? || record.user.id == user.id
  end

  def create?
    user&.admin?
  end

  def new?
    create?
  end

  def update?
    user&.admin? || record.user.id == user.id
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
      if user&.admin?
        scope.all
      else
        scope.where(user: user)
      end
    end

    private

    attr_reader :user, :scope
  end
end
