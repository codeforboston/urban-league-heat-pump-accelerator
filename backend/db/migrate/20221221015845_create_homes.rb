class CreateHomes < ActiveRecord::Migration[7.0]
  def change
    create_table :homes do |t|
      t.string :street_number
      t.string :street_name
      t.string :unit_number
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :building_type

      t.timestamps
    end
  end
end
