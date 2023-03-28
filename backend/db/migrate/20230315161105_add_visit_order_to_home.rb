# frozen_string_literal: true

class AddVisitOrderToHome < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :visit_order, :integer

    # Ensure within an assignment, the visit_order is unique
    add_index :homes, %i[assignment_id visit_order], unique: true
  end
end
