# frozen_string_literal: true

class AssignmentsSurveyorPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.surveyor.admin?
  end

  def new?
    create?
  end

  def update?
    user.surveyor.admin?
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
      scope.all
    end

    private

    attr_reader :user, :scope
  end
end
