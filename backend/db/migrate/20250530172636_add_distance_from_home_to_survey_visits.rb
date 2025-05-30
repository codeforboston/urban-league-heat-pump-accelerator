# frozen_string_literal: true

class AddDistanceFromHomeToSurveyVisits < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_visits, :distance_from_home, :decimal
  end
end
