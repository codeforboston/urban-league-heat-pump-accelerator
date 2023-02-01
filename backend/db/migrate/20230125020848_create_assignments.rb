# frozen_string_literal: true

class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.string :group
      t.references :surveyor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
