# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_17_011608) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "property_assessments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "heat_type"
    t.string "heat_fuel"
    t.string "ac_type"
    t.integer "fire_place"
    t.string "orientation"
    t.integer "num_parking"
    t.string "prop_view"
    t.string "corner_unit"
    t.integer "com_units"
    t.integer "rc_units"
    t.integer "land_sf"
    t.integer "gross_area"
    t.integer "living_area"
    t.integer "land_value"
    t.integer "bldg_value"
    t.integer "total_value"
    t.integer "pid"
    t.integer "cm_id"
    t.integer "gis_id"
    t.string "st_num"
    t.string "st_name"
    t.integer "unit_num"
    t.string "city"
    t.integer "zipcode"
    t.integer "bldg_seq"
    t.integer "num_bldgs"
    t.integer "luc"
    t.string "luc_desc"
    t.string "bldg_type"
    t.string "own_occ"
    t.string "owner"
    t.string "mail_addressee"
    t.string "mail_address"
    t.string "mail_city"
    t.string "mail_state", limit: 2
    t.string "mail_zipcode"
    t.float "res_floor"
    t.integer "cd_floor"
    t.integer "res_units"
    t.string "bdrm_cond"
    t.string "bthrm_style1"
    t.string "bthrm_style2"
    t.string "bthrm_style3"
    t.string "kitchen_type"
    t.string "kitchen_style1"
    t.string "kitchen_style"
    t.string "kitchen_style3"
    t.integer "internal_condition"
    t.integer "external_condition"
    t.integer "overall_condition"
    t.integer "bedrooms_count"
    t.integer "baths_full_count"
    t.integer "baths_half_count"
    t.integer "kitchens_count"
    t.integer "rooms_total_count"
  end

end
