# frozen_string_literal: true

json.extract! assignment, :id, :group, :surveyor_id

json.homes do
  # TODO: Sort on intended visit order once attribute added to DB
  json.array! assignment.homes, :id, :street_number, :street_name, :unit_number, :city, :state, :zip_code,
              :building_type
end
