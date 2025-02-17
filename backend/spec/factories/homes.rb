# frozen_string_literal: true

FactoryBot.define do
  factory :home do
    street_number { '1' }
    street_name { 'Broadway' }
    unit_number { '106' }
    city { 'Cambridge' }
    state { 'MA' }
    zip_code { '02139' }
    building_type { 'Apartment' }
    latitude { '42.32603453' }
    longitude { '-71.08999264' }
  end
end
