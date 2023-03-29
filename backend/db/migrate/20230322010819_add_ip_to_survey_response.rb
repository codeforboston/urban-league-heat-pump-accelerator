# frozen_string_literal: true

class AddIpToSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    add_column :survey_responses, :ip, :string
  end
end
