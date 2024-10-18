# frozen_string_literal: true

class AddAnswersToSurveyAnswers < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_answers, :answers, :string, array: true, default: []
  end
end
