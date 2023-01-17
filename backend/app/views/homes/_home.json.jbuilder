json.extract! home, :id, :street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type,
              :created_at, :updated_at
json.url home_url(home, format: :json)
