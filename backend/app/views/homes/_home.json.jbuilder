# frozen_string_literal: true

json.extract! home, :id, :street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type,
              :user_added, :assignment_id, :visit_order, :latitude, :longitude

json.status 'canonicalized' # TODO: Remove after GitHub issue 626 is complete.
json.visited home.visited?
json.completed home.completed?
json.survey_visit_ids home.survey_visit_ids
json.url home_url(home, format: :json)
