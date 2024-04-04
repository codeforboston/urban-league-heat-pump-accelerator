# frozen_string_literal: true

FactoryBot.define do
  factory :surveyor do
    user
    firstname { 'John' }
    lastname { 'Smith' }
    sequence(:email) { |n| "person#{n}@example.com" }
    phone { '1234567890' }
    street_address { '123 First Street' }
    geocode { '40.714224,-73.961452' }
    city { 'Cambridge' }
    zipcode { '01234' }
    state { 'MA' }
    status { 'active' }
  end
end
