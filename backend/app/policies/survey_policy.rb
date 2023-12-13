# frozen_string_literal: true

class SurveyPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    user.surveyor.admin?
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
