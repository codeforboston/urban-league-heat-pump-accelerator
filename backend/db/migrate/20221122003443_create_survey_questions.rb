class CreateSurveyQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :survey_questions do |t|
      t.text :text
      t.integer :response_type
      t.string :response_options, array: true
      t.belongs_to :survey, null: false, foreign_key: true

      t.timestamps
    end
    add_index :survey_questions, :response_options, using: 'gin'
  end
end
