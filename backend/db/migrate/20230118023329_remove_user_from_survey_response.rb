# frozen_string_literal: true

class RemoveUserFromSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    remove_reference :survey_responses, :user
  end
end
