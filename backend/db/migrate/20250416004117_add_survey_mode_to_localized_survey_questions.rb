# frozen_string_literal: true

class AddSurveyModeToLocalizedSurveyQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :localized_survey_questions, :survey_mode, :string, default: 'online'
  end
end
