# frozen_string_literal: true

class SurveyVisitPolicy < ApplicationPolicy
  attr_reader :user, :record

  def index?
    user&.admin? || user&.surveyor?
  end

  def show?
    user&.admin? || record.surveyor == user&.surveyor # or if you were the surveyor that submitted it?
  end

  def create?
    true
  end

  def new?
    create?
  end

  def update?
    user&.admin? || record.surveyor == user&.surveyor
  end

  def edit?
    update?
  end

  def destroy?
    user&.admin? || record.surveyor == user&.surveyor
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
        scope.where(surveyor: user&.surveyor)
      end
    end

    private

    attr_reader :user, :scope
  end
end
