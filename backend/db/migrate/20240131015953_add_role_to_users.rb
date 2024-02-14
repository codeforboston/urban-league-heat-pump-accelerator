# frozen_string_literal: true

class AddRoleToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :role, :integer
    remove_column :surveyors, :role
  end
end
