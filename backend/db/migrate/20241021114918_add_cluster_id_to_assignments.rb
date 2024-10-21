# frozen_string_literal: true

class AddClusterIdToAssignments < ActiveRecord::Migration[7.1]
  def change
    change_table :assignments, bulk: true do |t|
      t.integer :cluster_id

      t.string :latitude
      t.string :longitude
    end

    add_index :assignments, :cluster_id, unique: true
  end
end
