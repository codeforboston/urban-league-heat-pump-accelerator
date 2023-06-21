# frozen_string_literal: true

json.extract! assignment, :id, :group, :region_code, :geocode

json.surveyor_ids do
  json.array!(assignment.surveyors.map { |s| s[:id] })
end

json.homes do
  json.array!(assignment.homes.sort_by do |h|
                h[:visit_order]
              end, :id, :visit_order, :street_number, :street_name, :unit_number, :city, :state, :zip_code,
              :building_type, :visited?)
end
