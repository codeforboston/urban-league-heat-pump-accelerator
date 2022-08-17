class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|
      t.string :mail_addressee
      t.string :mail_address
      t.string :mail_city
      t.string :mail_state, :limit => 2
      t.string :mail_zipcode # these can be 5 or zip+4 format
      t.float :res_floor
      t.integer :cd_floor
      t.integer :res_units

      t.timestamps
    end
  end
end
