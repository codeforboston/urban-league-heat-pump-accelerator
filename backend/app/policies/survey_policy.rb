# frozen_string_literal: true

class SurveyPolicy < ApplicationPolicy
  attr_reader :user, :record

  def index?
    use&.admin?
  end

  def show?
    true
  end

  def create?
    user&.admin?
  end

  def new?
    create?
  end

  def update?
    user&.admin?
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end

    private

    attr_reader :user, :scope
  end
end
