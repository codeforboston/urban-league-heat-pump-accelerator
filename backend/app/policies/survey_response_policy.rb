# frozen_string_literal: true

class SurveyResponsePolicy < ApplicationPolicy
  attr_reader :user, :record

  def index?
    user&.admin? || user&.surveyor?
  end

  def show?
    # or if you were the surveyor that submitted it?
    user&.admin? || record.survey_visit.surveyor == user&.surveyor
  end

  def create?
    true
  end

  def new?
    create?
  end

  def update?
    user&.admin? || record.survey_visit.surveyor == user&.surveyor
  end

  def edit?
    update?
  end

  def destroy?
    user&.admin? || record.survey_visit.surveyor == user&.surveyor
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
        scope.includes(:survey_visit)
             .where('survey_visit.surveyor': user.surveyor)
      end
    end

    private

    attr_reader :user, :scope
  end
end
