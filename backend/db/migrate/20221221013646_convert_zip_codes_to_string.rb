# frozen_string_literal: true

class ConvertZipCodesToString < ActiveRecord::Migration[7.0]
  def change
    reversible do |migration|
      migration.up do
        change_column(:property_assessments, :zipcode, :string)
      end
      migration.down do
        change_column(:property_assessments, :zipcode, :integer)
      end
    end
  end
end
