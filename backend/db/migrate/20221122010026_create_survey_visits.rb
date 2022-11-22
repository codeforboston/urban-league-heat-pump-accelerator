# frozen_string_literal: true

class CreateSurveyVisits < ActiveRecord::Migration[7.0]
  def change
    create_table :survey_visits do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.boolean :completed

      t.timestamps
    end
  end
end
