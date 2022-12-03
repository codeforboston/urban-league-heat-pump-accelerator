# frozen_string_literal: true

FactoryBot.define do
  factory :surveyor do
    user { nil }
    firstname { 'MyString' }
    lastname { 'MyString' }
    email { 'MyString' }
    phone { 'MyString' }
    street_address { 'MyString' }
    geocode { 'MyString' }
    city { 'MyString' }
    zipcode { 'MyString' }
    state { 'MyString' }
    role { 'MyString' }
    status { 'MyString' }
  end
end
