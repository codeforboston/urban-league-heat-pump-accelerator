# frozen_string_literal: true

json.extract! surveyor, :id, :user_id, :firstname, :lastname, :email, :phone, :street_address, :geocode, :city,
              :zipcode, :state, :role, :status, :created_at, :updated_at
json.url surveyor_url(surveyor, format: :json)
