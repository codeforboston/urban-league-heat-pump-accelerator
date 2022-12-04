# frozen_string_literal: true

FactoryBot.define do
  factory :surveyor do
    user
    firstname { 'John' }
    lastname { 'Smith' }
    email { 'johnsmith@example.com' }
    phone { 'MyString' }
    street_address { '123 First Street' }
    geocode { 'MyString' }
    city { 'Cambridge' }
    zipcode { '01234' }
    state { 'MA' }
    role { 'surveyor' }
    status { 'active' }
  end
end
