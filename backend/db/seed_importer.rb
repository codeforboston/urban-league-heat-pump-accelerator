# frozen_string_literal: true

require 'smarter_csv'

#   Seed importer provides a reusable function to import a csv file
module SeedImporter
  def import_seed_data(path)
    options = { downcase_header: true, verbose: true }
    SmarterCSV.process(path, options) do |chunk|
      chunk.each do |data_hash|
        PropertyAssessment.create!(data_hash)
      end
    end
  end
end
