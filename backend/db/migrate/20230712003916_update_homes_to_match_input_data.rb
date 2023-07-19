class UpdateHomesToMatchInputData < ActiveRecord::Migration[7.0]
  def change
    add_column :homes, :bedroom_score, :integer
    add_column :homes, :floor_score, :integer
    add_column :homes, :geometry, :string
    add_column :homes, :heat_type_score, :integer
    add_column :homes, :latitude, :string
    add_column :homes, :living_space_frag_score, :integer
    add_column :homes, :living_space_fragmentation, :decimal
    add_column :homes, :longitude, :string
    add_column :homes, :map_par_id, :integer
    add_column :homes, :space_between_houses, :decimal
    add_column :homes, :total_score_x, :integer
    add_column :homes, :yr_built_category, :string
    add_column :homes, :yr_built_score, :integer

    drop_table :property_assessments
  end
end
