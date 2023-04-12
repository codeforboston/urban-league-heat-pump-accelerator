class JoinSurveyorsToAssignsments < ActiveRecord::Migration[7.0]
  def change
    remove_column(:assignments, :surveyor_id, :bigint)
    create_join_table :surveyors, :assignments do |t|
      t.index :surveyor_id
      t.index :assignment_id
    end
  end
end
