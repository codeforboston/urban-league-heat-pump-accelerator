class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|

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
