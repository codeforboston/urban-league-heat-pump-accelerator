# frozen_string_literal: true

class RemoveUserFromSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    reversible do |migration|
      migration.up do
        remove_column :survey_responses, :user_id, :bigint
      end
      migration.down do
        add_column :survey_responses, :user_id, :bigint
      end
    end
  end
end
