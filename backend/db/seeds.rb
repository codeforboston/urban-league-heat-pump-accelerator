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

SeedImporter.import_seed_data(Rails.configuration.seed_data_path, '../data-analysis/clustered_ordered_parcels.csv') unless Rails.env.test?
