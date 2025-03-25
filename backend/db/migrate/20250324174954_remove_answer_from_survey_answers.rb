# frozen_string_literal: true

class RemoveAnswerFromSurveyAnswers < ActiveRecord::Migration[7.1]
  def change
    remove_column :survey_answers, :answer, :text
  end
end
