# frozen_string_literal: true

FactoryBot.define do
  factory :surveyor do
    user
    firstname { 'John' }
    lastname { 'Smith' }
    email { 'johnsmith@example.com' }
    phone { 'MyString' }
    street_address { '123 First Street' }
    geocode { '40.714224,-73.961452' }
    city { 'Cambridge' }
    zipcode { '01234' }
    state { 'MA' }
    role { 'surveyor' }
    status { 'active' }
  end
end
