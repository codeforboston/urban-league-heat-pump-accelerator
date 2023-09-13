# frozen_string_literal: true

class AddUserAddedAttributeToHome < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :user_added, :boolean, null: false, default: false
  end
end
