# frozen_string_literal: true

class SurveyorPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    user.surveyor.admin?
  end

  def show?
    user.surveyor.admin? || record == user.surveyor
  end

  def create?
    true
  end

  def new?
    create?
  end

  def update?
    user.surveyor.admin? || record == user.surveyor
  end

  def edit?
    update?
  end

  def destroy?
    user.surveyor.admin?
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.surveyor.admin?
        scope.all
      end
    end

    private

    attr_reader :user, :scope
  end
end
