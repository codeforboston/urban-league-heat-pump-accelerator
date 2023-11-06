# frozen_string_literal: true

json.extract! assignment, :id, :group, :region_code, :geocode

json.surveyor_ids do
  json.array!(assignment.surveyors.map { |s| s[:id] })
end

@sorted_homes = assignment.homes.sort_by do |h|
  h[:visit_order]
end

json.homes @sorted_homes do |home|
  json.extract! home, :id, :street_number, :street_name, :unit_number, :city, :state, :zip_code,
                :building_type, :visit_order, :latitude, :longitude
  json.visited home.visited?
  json.completed home.completed?
end
