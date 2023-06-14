# frozen_string_literal: true

class AddStatusAttributeToHome < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :status, :string, null: false, default: 'uncanonicalized'
  end
end
