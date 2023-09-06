# frozen_string_literal: true

class AddStatusAttributeToHome < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :status, :integer, null: false, default: 0  # Default to uncanonicalized
  end
end
