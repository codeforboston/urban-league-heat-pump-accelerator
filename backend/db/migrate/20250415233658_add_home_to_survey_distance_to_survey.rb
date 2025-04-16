class AddHomeToSurveyDistanceToSurvey < ActiveRecord::Migration[7.1]
  def change
    add_column :survey_visits, :home_distance_miles, :decimal, null: true
  end
end
