# frozen_string_literal: true

class RemoveStatusFromHomes < ActiveRecord::Migration[7.1]
  def change
    remove_column :homes, :status, :integer, null: false, default: 0
  end
end
