# frozen_string_literal: true

FactoryBot.define do
  factory :assignment do
    group { 'MyString' }
    surveyor { nil }
  end
end
