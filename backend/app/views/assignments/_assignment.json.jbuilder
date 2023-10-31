# frozen_string_literal: true

json.extract! assignment, :id, :group, :region_code, :geocode

json.surveyor_ids do
  json.array!(assignment.surveyors.map { |s| s[:id] })
end

@sorted_homes = assignment.homes.sort_by do |h|
  h[:visit_order]
end

json.homes do
  json.array! @sorted_homes, partial: 'homes/home', as: :home
end
