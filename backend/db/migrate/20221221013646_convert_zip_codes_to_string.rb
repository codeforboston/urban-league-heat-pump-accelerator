class ConvertZipCodesToString < ActiveRecord::Migration[7.0]
  def change
    change_column(:property_assessments, :zipcode, :string)
  end
end
