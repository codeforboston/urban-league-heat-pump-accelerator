class AddFormatToLocalizedSurveyQuestion < ActiveRecord::Migration[7.1]
  def change
    add_column :localized_survey_questions, :format, :string, default: 'online'
  end
end
