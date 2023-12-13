# frozen_string_literal: true

class SurveyResponsePolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    user.surveyor.admin? || user.surveyor.surveyor?
  end

  def show?
    user.surveyor.admin? || record.survey_visit.surveyor == user.surveyor # or if you were the surveyor that submitted it?
  end

  def create?
    true
  end

  def new?
    create?
  end

  def update?
    user.surveyor.admin? || record.survey_visit.surveyor == user.surveyor
  end

  def edit?
    update?
  end

  def destroy?
    user.surveyor.admin? || record.survey_visit.surveyor == user.surveyor
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.surveyor.admin?
        scope.all
      else
        scope.includes(:survey_visit).where('survey_visit.surveyor': user.surveyor)
      end
    end

    private

    attr_reader :user, :scope
  end
end
