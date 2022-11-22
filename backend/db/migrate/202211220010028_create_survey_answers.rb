class CreateSurveyAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :survey_answers do |t|
      t.text :answer
      t.belongs_to :survey_response, null: false, foreign_key: true
      t.belongs_to :survey_question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
