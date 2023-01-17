# frozen_string_literal: true

class AddHomeReferenceToSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :survey_response_id, :bigint
  end
end
