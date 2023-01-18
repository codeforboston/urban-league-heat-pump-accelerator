# frozen_string_literal: true

class RemoveUserFromSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    remove_column :survey_responses, :user_id, :bigint
  end
end
