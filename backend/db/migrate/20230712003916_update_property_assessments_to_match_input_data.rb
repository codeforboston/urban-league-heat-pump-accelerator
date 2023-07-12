class UpdatePropertyAssessmentsToMatchInputData < ActiveRecord::Migration[7.0]
  def change
    # TODO: for adding columns, need to include their data types
    add_column :property_assessments :bedroom_score :integer
    add_column :property_assessments :cluster :integer
    add_column :property_assessments :floor_score :integer
    add_column :property_assessments :geocoded :string
    add_column :property_assessments :geometry :string
    add_column :property_assessments :heat_type_score :integer
    add_column :property_assessments :latitude :string
    add_column :property_assessments :living_space_frag_score :integer
    add_column :property_assessments :living_space_fragmentation
    add_column :property_assessments :longitude :string
    add_column :property_assessments :map_par_id 
    add_column :property_assessments :order
    add_column :property_assessments :space_between_houses
    add_column :property_assessments :total_score_x
    add_column :property_assessments :yr_built_category
    add_column :property_assessments :yr_built_score

    remove_column :property_assessments :bdrm_cond
    remove_column :property_assessments :bldg_seq
    remove_column :property_assessments :bldg_value
    remove_column :property_assessments :bthrm_style1
    remove_column :property_assessments :bthrm_style2
    remove_column :property_assessments :bthrm_style3
    remove_column :property_assessments :cd_floor
    remove_column :property_assessments :cm_id
    remove_column :property_assessments :com_units
    remove_column :property_assessments :corner_unit
    remove_column :property_assessments :created_at
    remove_column :property_assessments :full_bth
    remove_column :property_assessments :gross_tax
    remove_column :property_assessments :hlf_bth
    remove_column :property_assessments :kitchen
    remove_column :property_assessments :kitchen_style1
    remove_column :property_assessments :kitchen_style2
    remove_column :property_assessments :kitchen_style3
    remove_column :property_assessments :kitchen_type
    remove_column :property_assessments :land_value
    remove_column :property_assessments :luc
    remove_column :property_assessments :mail_addressee
    remove_column :property_assessments :mail_state
    remove_column :property_assessments :num_bldgs
    remove_column :property_assessments :num_parking
    remove_column :property_assessments :orientation
    remove_column :property_assessments :overall_cond
    remove_column :property_assessments :prop_view
    remove_column :property_assessments :rc_units
    remove_column :property_assessments :res_units
    remove_column :property_assessments :roof_cover
    remove_column :property_assessments :roof_structure
    remove_column :property_assessments :total_value
    remove_column :property_assessments :updated_at
    # add_column :survey_responses, :completed, :boolean
    # remove_column :survey_visits, :completed, :boolean
  end
end
