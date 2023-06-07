# frozen_string_literal: true

class CanonicalizeAddressJob < ApplicationJob
  queue_as :default

  def perform(home_id) # rubocop:disable Metrics/MethodLength
    home = Home.find(home_id)

    # Extract details from home to send to service
    home_map = {
      street_number: home.street_number,
      street_name: home.street_name,
      unit_number: home.unit_number,
      city: home.city,
      state: home.state,
      zip_code: home.zip_code
    }
    # TODO: update with real call
    # change_map = CanonicalizeAddressHelper.canonicalize_address home_map
    # change_map = {:unit_number => 60}
    # TODO: handle case where lookup fails – need to decide logic
    change_map = {}

    # Search for existing home record matching the canonicalized attributes
    combined_map = home_map.merge(change_map)
    existing_home = Home.where(combined_map).first
    
    if existing_home.nil?
      # If cannot find, then update and no further changes needed
    
      # Regardless whether changes are needed,
      # we want to set canonicalized to true
      change_map[:canonicalized] = true
      home.update change_map
    else
      # If find match, then move survey visits to old home and delete
      ActiveRecord::Base.transaction do
        home.survey_visits.each { |sv|
          sv.home = existing_home
          sv.save
        }
        home.delete
      end
    end
  end
end
