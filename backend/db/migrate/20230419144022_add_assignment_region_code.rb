# frozen_string_literal: true

class AddAssignmentRegionCode < ActiveRecord::Migration[7.0]
  def change
    add_column(:assignments, :region_code, :integer)
  end
end
