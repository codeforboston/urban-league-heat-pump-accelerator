# frozen_string_literal: true

class AddLanguageCodeToSurveyResponses < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_responses, :language_code, :string
  end
end
