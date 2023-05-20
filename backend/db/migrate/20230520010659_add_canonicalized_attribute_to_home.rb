# frozen_string_literal: true

class AddCanonicalizedAttributeToHome < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :canonicalized, :boolean, null: false, default: false
  end
end
