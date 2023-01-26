class ChangeCornerUnitToBoolean < ActiveRecord::Migration[7.0]
  def change
    reversible do |migration|
      migration.up do
        change_column :property_assessments, :corner_unit, :boolean, using: 'corner_unit::boolean'
      end
      migration.down do
        change_column :property_assessments, :corner_unit, :string
      end
    end
  end
end
