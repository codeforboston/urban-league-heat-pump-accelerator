# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { 'stevejobs@apple.com' }
    password { 'HelloFromTheiCloud' }
  end
end
