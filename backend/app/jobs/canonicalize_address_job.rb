# frozen_string_literal: true

class CanonicalizeAddressJob < ApplicationJob
  queue_as :default

  def perform(home_id) # rubocop:disable Metrics/MethodLength,Metrics/AbcSize
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
    change_map = {}

    if change_map.nil?
      # Lookup failed - the address was not recognized
      change_map = {
        status: 'unrecognized'
      }
      home.update change_map
    else
      # Lookup succeeded - found address
      # Search for existing home record matching the canonicalized attributes
      combined_map = home_map.merge(change_map)
      existing_home = Home.where(combined_map).first

      if existing_home.nil?
        # If cannot find, then update and no further changes needed

        # Regardless whether changes are needed,
        # we want to mark as canonicalized.
        change_map[:status] = 'canonicalized'
        home.update change_map
      else
        # If find match, then move survey visits to existing home and delete
        ActiveRecord::Base.transaction do
          home.survey_visits.each do |sv|
            sv.home = existing_home
            sv.save
          end
          home.delete
        end
      end
    end
  end
end
