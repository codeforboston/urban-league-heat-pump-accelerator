FactoryBot.define do
  factory :home do
    street_number { '1' }
    street_name { 'Broadway' }
    unit_number { '106' }
    city { 'Cambridge' }
    state { 'MA' }
    zip_code { '02139' }
    building_type { 'Apartment' }
  end
end
