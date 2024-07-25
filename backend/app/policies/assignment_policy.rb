# frozen_string_literal: true

class AssignmentPolicy < ApplicationPolicy
  attr_reader :user, :record

  def index?
    true
  end

  def show?
    if user&.admin?
      true
    else
      surveyor_id = user&.surveyor&.id
      @record.surveyor_ids.any? { |id| id == surveyor_id }
    end
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
        surveyor_id = user&.surveyor&.id
        scope.joins(:surveyors).where(surveyors: { id: surveyor_id })
      end
    end

    private

    attr_reader :user, :scope
  end
end
