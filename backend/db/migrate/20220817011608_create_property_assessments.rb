class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|
      t.integer :com_units
      t.integer :rc_units
      t.float :land_sf
      t.float :gross_area
      t.float :living_area
      t.decimal :land_value
      t.decimal :bldg_value
      t.decimal :total_value

      t.timestamps
    end
  end
end
