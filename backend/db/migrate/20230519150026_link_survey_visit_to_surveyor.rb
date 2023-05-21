# frozen_string_literal: true

class LinkSurveyVisitToSurveyor < ActiveRecord::Migration[7.0]
  def change
    remove_reference :survey_visits, :user
    add_reference :survey_visits, :surveyor, foreign_key: true
  end
end
