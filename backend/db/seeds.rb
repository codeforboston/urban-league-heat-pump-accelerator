# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'smarter_csv'
require_relative 'seed_importer'

# rubocop:disable Style/MixinUsage
include SeedImporter
# rubocop:enable Style/MixinUsage

unless Rails.env.test?
  SeedImporter.import_seed_data('lib/seeds/',
                                'lib/seeds/clustered_ordered_parcels.csv')
  SeedImporter.normalize_home_addresses('lib/seeds/google_maps_normalized_addresses.csv')
end
