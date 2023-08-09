# frozen_string_literal: true

class RemoveCompletedFromSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    remove_column :survey_responses, :completed, :boolean
  end
end
