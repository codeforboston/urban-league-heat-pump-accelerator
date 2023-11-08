# frozen_string_literal: true

class CanonicalizeAddressJob < ApplicationJob
  queue_as :default

  def perform(home_id) # rubocop:disable Metrics/MethodLength,Metrics/AbcSize,Metrics/CyclomaticComplexity,Metrics/PerceivedComplexity
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
    # TODO: handle response failing
    results = JSON.parse(response.body)['features']

    # rubocop:disable Style/MultilineBlockChain
    match_to_use = if (match = results.select { |r| r['properties']['match_type'] == 'exact' }.first)
                     # Try taking first 'exact' match
                     match['properties']
                   elsif (match = results.select do |r|
                     r['properties']['match_type'] == 'interpolated'
                   end.max_by { |r| r['properties']['confidence'].to_f })
                     # Then fall back to highest confidence 'interpolated' result
                     match['properties']
                   end
    # If couldn't find any match, match_to_use is nil
    # rubocop:enable Style/MultilineBlockChain

    if match_to_use
      # If we got some result back from Pelias, figure out what needs changing i.e. build change_map
      # Compare match_to_use against home_map
      change_map = {}

      if home_map[:street_number] != match_to_use['housenumber'].to_s
        change_map[:street_number] = match_to_use['housenumber'].to_s
      end
      change_map[:city] = match_to_use['locality'] if home_map[:city] != match_to_use['locality']
      change_map[:state] = match_to_use['region'] if home_map[:state] != match_to_use['region']
      change_map[:zip_code] = match_to_use['postalcode'] if home_map[:zip_code] != match_to_use['postalcode']
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
        # If find match for existing_home, then move survey visits to existing home and delete
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
