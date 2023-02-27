# frozen_string_literal: true

class AddDisplayOrderToSurveyQuestion < ActiveRecord::Migration[7.0]
  def change
    add_column :survey_questions, :display_order, :integer, null: false, default: 0
  end
end
