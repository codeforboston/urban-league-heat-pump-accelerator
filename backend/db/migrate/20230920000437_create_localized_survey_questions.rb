class CreateLocalizedSurveyQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :localized_survey_questions do |t|
      t.string :language_code
      t.text :text
      t.string :response_options, array: true
      t.references :survey_question

      t.timestamps
    end
    remove_column :survey_questions, :text, :text
    remove_column :survey_questions, :response_options, :string, array: true
  end
end
