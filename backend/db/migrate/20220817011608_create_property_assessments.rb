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
      t.integer :com_units
      t.integer :rc_units
      t.integer :land_sf
      t.integer :gross_area
      t.integer :living_area
      t.integer :land_value
      t.integer :bldg_value
      t.integer :total_value

      t.integer :pid
      t.integer :cm_id
      t.integer :gis_id
      t.string :st_num
      t.string :st_name
      t.integer :unit_num
      t.string :city
      t.integer :zipcode

      t.integer :bldg_seq
      t.integer :num_bldgs
      t.integer :luc
      t.string :luc_desc
      t.string :bldg_type
      t.string :own_occ # no char datatype?

      t.string :owner      
      t.string :mail_addressee
      t.string :mail_address
      t.string :mail_city
      t.string :mail_state, :limit => 2
      t.string :mail_zipcode # these can be 5 or zip+4 format
      t.float :res_floor
      t.integer :cd_floor
      t.integer :res_units
      
      t.string :bdrm_cond
      t.string :bthrm_style1
      t.string :bthrm_style2
      t.string :bthrm_style3
      t.string :kitchen_type
      t.string :kitchen_style1
      t.string :kitchen_style  # is this kitchen_style2?
      t.string :kitchen_style3

      t.integer :internal_condition
      t.integer :external_condition
      t.integer :overall_condition
      t.integer :bedrooms_count
      t.integer :baths_full_count
      t.integer :baths_half_count
      t.integer :kitchens_count
      t.integer :rooms_total_count

    
      # I noticed these fields were missing from the table.
      t.integer :gross_tax
      t.integer :yr_built
      t.integer :yr_remodel
      t.string :structure_class
      t.string :roof_structure
      t.string :roof_cover
      t.string :int_wall
      t.string :ext_finished

    end
  end
end
