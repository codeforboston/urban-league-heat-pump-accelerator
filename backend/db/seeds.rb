# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'smarter_csv'

options = { key_mapping: { id: :cm_id, sam: :st_num, PID: :pid }, verbose: true, downcase_header: false }

SmarterCSV.process('tmp/mini.csv', options) do |chunk|
  chunk.each do |data_hash|
    PropertyAssessment.create!(data_hash)
  end
end
