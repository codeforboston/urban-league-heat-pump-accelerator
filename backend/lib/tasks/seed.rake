# frozen_string_literal: true

require 'open-uri'
require_relative '../../db/seed_importer'

# rubocop:disable Style/MixinUsage
include SeedImporter
# rubocop:enable Style/MixinUsage

full_seed_data_local_path = 'lib/seeds/download/boston_fy2022_pa.csv'
test_seed_data_local_path = 'lib/seeds/test_seeds.csv'

namespace :seed do
  desc 'Download City of Boston dataset'
  task download: :environment do
    target_dir = File.dirname(full_seed_data_local_path)
    Dir.mkdir(target_dir) unless Dir.exist?(target_dir)
    unless File.exist?(full_seed_data_local_path)
      remote_path = 'https://data.boston.gov/dataset/e02c44d2-3c64-459c-8fe2-e1ce5f38a035/resource/4b99718b-d064-471b-9b24-517ae5effecc/download/fy2022pa-4.csv'
      URI.parse(remote_path).open do |input|
        File.open(full_seed_data_local_path, 'wb') do |output|
          output.write(input.read)
        end
      end
    end
  end
end
