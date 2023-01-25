class AddAssignmentIdToHomes < ActiveRecord::Migration[7.0]
  def change
    add_reference :homes, :assignment
  end
end
