# frozen_string_literal: true

json.extract! surveyor, :user_id, :firstname, :lastname, :email, :phone, :street_address, :city,
              :state, :zipcode, :geocode, :role, :status
json.url surveyor_url(surveyor, format: :json)
