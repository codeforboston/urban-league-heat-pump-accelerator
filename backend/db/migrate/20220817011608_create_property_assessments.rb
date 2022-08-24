class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|

      t.integer :pid
      t.integer :cm_id
      t.integer :gis_id
      t.string :st_num
      t.string :st_name
      t.integer :unit_num
      t.string :city
      t.integer :zipcode

      t.timestamps

      t.integer :bldg_seq
      t.integer :num_bldgs
      t.integer :luc
      t.string :luc_desc
      t.string :bldg_type
      t.string :own_occ # no char datatype?
      t.string :owner      



    end
  end
end
