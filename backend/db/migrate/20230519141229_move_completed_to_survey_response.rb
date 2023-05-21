# frozen_string_literal: true

class MoveCompletedToSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    add_column :survey_responses, :completed, :boolean
    remove_column :survey_visits, :completed, :boolean
  end
end
