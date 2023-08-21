# frozen_string_literal: true

json.extract! home, :id, :street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type,
              :assignment_id, :visit_order, :latitude, :longitude, :survey_visit_ids
json.visited home.visited?
json.completed home.completed?
json.url home_url(home, format: :json)
