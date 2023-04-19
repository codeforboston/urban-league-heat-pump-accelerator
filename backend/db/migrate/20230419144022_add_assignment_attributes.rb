# frozen_string_literal: true

class AddAssignmentAttributes < ActiveRecord::Migration[7.0]
  def change
    add_column(:assignments, :assignment_code, :integer)
    add_column(:assignments, :region_code, :integer)
  end
end
