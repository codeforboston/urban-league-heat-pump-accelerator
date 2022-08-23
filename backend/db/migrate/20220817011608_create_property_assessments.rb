class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|

      t.timestamps

      t.string :heat_type
      t.string :heat_fuel
      t.string :ac_type
      t.integer :fire_place
      t.string :orientation
      t.integer :num_parking
      t.string :prop_view
      t.string :corner_unit
    end
  end
end
