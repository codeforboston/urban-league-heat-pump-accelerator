# frozen_string_literal: true

class AddLatitudeLongitudeToSurveyVisits < ActiveRecord::Migration[7.1]
  def change
    change_table :survey_visits, bulk: true do |t|
      t.string :latitude
      t.string :longitude
    end
  end
end
