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

    conn = Faraday.new(
      url: 'https://pelias.mapc.org',
      headers: { 'Content-Type' => 'application/json' }
    )
    response = conn.get('/v1/search/structured',
                        {
                          'address': "#{home_map[:street_number]} #{home_map[:street_name]}",
                          'locality': home_map[:city],
                          'region': home_map[:state],
                          'country': 'USA',
                          'postalcode': home_map[:zip_code]
                        })
    result = JSON.parse(response.body)['features']

    exact_match = result.select do |feature|
      feature['properties']['housenumber'] == home_map['street_number'] &&
        feature['properties']['street'] == home_map['street_name']
    end
    match_to_use = exact_match.empty? ? result.first : exact_match.first

    debugger

    if match_to_use
      change_map = {}
      if change_map[:street_number] != match_to_use['housenumber'].to_s
        change_map[:street_number] = match_to_use['housenumber'].to_s
      end
      change_map[:city] = match_to_use['locality'] if change_map[:city] != match_to_use['locality']
      change_map[:state] = match_to_use['region'] if change_map[:state] != match_to_use['region']
      change_map[:zip_code] = match_to_use['postalcode'] if change_map[:zip_code] != match_to_use['postalcode']
    else
      change_map = nil
    end

    if change_map.nil?
      # Lookup failed - the address was not recognized
      home.update_column(:status, Home.statuses[:unrecognized]) # rubocop:disable Rails/SkipsModelValidations
    else
      # Lookup succeeded - found address
      # Search for existing home record matching the canonicalized attributes,
      #  but that isn't home itself
      combined_map = home_map.merge(change_map)
      existing_home = Home.where.not(id: home_id).where(combined_map).first

      if existing_home.nil?
        # If cannot find, then update and no further changes needed

        # Regardless whether changes are needed,
        # we want to mark as canonicalized.
        change_map[:status] = Home.statuses[:canonicalized]
        home.update_columns change_map # rubocop:disable Rails/SkipsModelValidations
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
