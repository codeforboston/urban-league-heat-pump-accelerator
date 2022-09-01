class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    # Schema for Boston Property Assessment Data.
    # Data key: https://data.boston.gov/dataset/property-assessment/resource/db9d1e04-080b-4477-96e0-c440f3ff29f1
    create_table :property_assessments do |t|
      t.timestamps
      t.integer :pid
      t.integer :cm_id
      t.integer :gis_id
      t.string  :st_num
      t.string  :st_name
      t.integer :unit_num
      t.string  :city
      t.integer :zipcode
      t.integer :bldg_seq
      t.integer :num_bldgs
      t.integer :luc
      t.string  :lu, limit: 2
      t.string  :luc_desc
      t.string  :bldg_type
      t.boolean :own_occ  # Boolean represented as Y or N
      t.string  :owner
      t.string  :mail_addressee
      t.string  :mail_address
      t.string  :mail_city
      t.string  :mail_state, limit: 2
      t.string  :mail_zipcode
      t.float   :res_floor
      t.integer :cd_floor
      t.integer :res_units
      t.integer :com_units
      t.integer :rc_units
      t.integer :land_sf
      t.integer :gross_area
      t.integer :living_area
      t.integer :land_value
      t.integer :bldg_value
      t.integer :total_value
      t.integer :gross_tax
      t.integer :yr_built
      t.integer :yr_remodel
      t.string  :structure_class, limit: 1
      t.string  :roof_structure, limit: 1
      t.string  :roof_cover, limit: 1
      t.string  :int_wall
      t.string  :ext_finished
      t.integer :int_cond
      t.integer :ext_cond
      t.integer :overall_cond
      t.integer :bed_rms
      t.integer :full_bth
      t.integer :hlf_bath
      t.integer :kitchen
      t.integer :tt_rms
      t.string  :bdrm_cond
      t.string  :bthrm_style1
      t.string  :bthrm_style2
      t.string  :bthrm_style3
      t.string  :kitchen_type
      t.string  :kitchen_style1
      t.string  :kitchen_style2
      t.string  :kitchen_style3
      t.string  :heat_type
      t.string  :heat_fuel
      t.string  :ac_type
      t.integer :fire_place
      t.string  :orientation
      t.integer :num_parking
      t.string  :prop_view
      t.boolean :corner_unit  # Boolean represented as Y or N
    end
  end
end
