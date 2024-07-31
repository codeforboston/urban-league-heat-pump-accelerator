# frozen_string_literal: true

class SurveyAnswerPolicy < ApplicationPolicy
  attr_reader :user, :record

  def show?
    user&.admin?
  end

  def create?
    true
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
      if user&.admin?
        scope.all
      else
        scope.none
      end
    end

    private

    attr_reader :user, :scope
  end
end
