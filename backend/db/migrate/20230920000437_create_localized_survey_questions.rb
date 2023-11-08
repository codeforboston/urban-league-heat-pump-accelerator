# frozen_string_literal: true

class CreateLocalizedSurveyQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :localized_survey_questions do |t|
      t.string :language_code
      t.text :text
      t.string :response_options, array: true
      t.references :survey_question

      t.timestamps
    end

    change_table :survey_questions, bulk: true do |t|
      t.remove :text, type: :text
      t.remove :response_options, type: :string, array: true
    end
  end
end
