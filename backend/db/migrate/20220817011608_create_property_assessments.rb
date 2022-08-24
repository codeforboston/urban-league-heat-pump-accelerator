class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|
      t.integer :com_units
      t.integer :rc_units
      t.integer :land_sf
      t.integer :gross_area
      t.integer :living_area
      t.integer :land_value
      t.integer :bldg_value
      t.integer :total_value

      t.timestamps
    end
  end
end
