class ChangeOwnOccToBoolean < ActiveRecord::Migration[7.0]
  def change
    reversible do |migration|
      migration.up do
        change_column :property_assessments, :own_occ, :boolean, using: 'own_occ::boolean'
      end
      migration.down do
        change_column :property_assessments, :own_occ, :string
      end
    end
  end
end
