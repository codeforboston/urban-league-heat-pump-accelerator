# frozen_string_literal: true

class MoveSurveyResponseToVisit < ActiveRecord::Migration[7.0]
  def change
    reversible do |migration|
      migration.up do
        remove_column :homes, :survey_response_id, :bigint
        add_reference :survey_visits, :home
      end
      migration.down do
        remove_reference :survey_visits, :home
        add_column :homes, :survey_response_id, :bigint
      end
    end
  end
end
