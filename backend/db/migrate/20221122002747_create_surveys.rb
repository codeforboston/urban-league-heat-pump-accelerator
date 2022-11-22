# frozen_string_literal: true

class CreateSurveys < ActiveRecord::Migration[7.0]
  def change
    create_table :surveys do |t|
      t.string :title

      t.timestamps
    end
  end
end
