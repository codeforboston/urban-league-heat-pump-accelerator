# frozen_string_literal: true

class AddGeocodeToAssignment < ActiveRecord::Migration[7.0]
  def change
    add_column :assignments, :geocode, :string
  end
end
