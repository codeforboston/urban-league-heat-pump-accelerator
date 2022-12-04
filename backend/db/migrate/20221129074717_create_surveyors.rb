# frozen_string_literal: true

# Create the Surveyors table
class CreateSurveyors < ActiveRecord::Migration[7.0]
  def change
    create_table :surveyors do |t|
      t.references :user, null: false, foreign_key: true
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :phone
      t.string :street_address
      t.string :geocode
      t.string :city
      t.string :zipcode
      t.string :state
      t.string :role
      t.string :status

      t.timestamps
    end
  end
end
