# rubocop:disable all

require 'httparty'
require 'geocoder'

class GoogleMapsGeocoder
  GEOCODER_API_KEY = ENV['GEOCODER_API_KEY']

  def self.find_all_homes
    csv_options = {
      map_headers: {
        home_id: 'Home ID',
        error: 'Error',
        original_address: 'Original Address',
        normalized_address: 'Normalized Address',
        normalized_street_number: 'Normalized Street Number',
        normalized_street_name: 'Normalized Street Name',
        normalized_city: 'Normalized City',
        flag_number_changed: 'Flag Number Changed'
      }
    }

    file = File.open("#{Rails.root}/tmp/storage/google_maps_geocoder_csv_#{Time.now.to_i}.csv", 'w')

    begin
      SmarterCSV.generate(file.path, csv_options) do |writer|
        Home.where('id < 10').pluck(:id).each do |id|
          begin
            writer << GoogleMapsGeocoder.find_home(id)
          rescue StandardError => e
            writer << { home_id: id, error: e }
          end
        end
      end
    ensure
      file.close
    end
  end

  def self.find_home(id)
    home = Home.find(id)

    cleaned_street_name = if home.street_name.ends_with?(' TE')
      old_street_name = home.street_name
      old_street_name[0, old_street_name.length - 2] + "Terrace"
    else
      home.street_name
    end

    original_address = "#{home.street_number} #{home.street_name}, #{home.city}, MA #{home.zip_code}"
    cleaned_address = "#{home.street_number} #{cleaned_street_name}, #{home.city}, MA #{home.zip_code}"

    # Call Google Maps Geocode API
    result_1 = find_address_in_google_api(cleaned_address, home)

    distance_1 = calculate_distance_between_google_result_and_home(result_1['navigation_points'], home)

    if distance_1.nil?
      output = {
        home_id: id,
        error: 'Error: Could not geocode home',
        original_address: original_address,
        normalized_address: nil,
        normalized_street_number: nil,
        normalized_street_name: nil,
        normalized_city: nil,
        flag_number_changed: false
      }
    else
      normalized_street_number = street_number(result_1)
      normalized_street_name = street_name(result_1)
      normalized_city = city(result_1)

      # Do not use normalized street number in normalized address as it converts addresses such as
      # "70 72D GALLIVAN BL, DORCHESTER, MA 02124" to "72D GALLIVAN BL, DORCHESTER, MA 02124"
      # but from Google Street view, 70 is the viewable address
      normalized_address = "#{home.street_number} #{normalized_street_name}, #{normalized_city}, MA #{home.zip_code}"

      output = {
        home_id: id,
        error: nil,
        original_address: original_address,
        normalized_address: normalized_address,
        normalized_street_number: normalized_street_number,
        normalized_street_name: normalized_street_name,
        normalized_city: normalized_city,
        flag_number_changed: normalized_street_number != home.street_number
      }

      if distance_1 > 0.05
        output[:error] = 'Error: Geocoded home far away'
      else
        # Call Google Maps Geocode API again on new result, make sure still consistent with lat/lng of original home
        result_2 = find_address_in_google_api(normalized_address, home)
        distance_2 = calculate_distance_between_google_result_and_home(result_2['navigation_points'], home)

        if distance_2.nil?
          output[:error] = 'Error: Something went wrong, home no longer findable after normalization'
        elsif distance_2 > 0.05
          output[:error] = 'Error: Something went wrong, home farther away after normalization'
        end
      end
    end

    output
  end

  def self.calculate_distance_between_google_result_and_home(navigation_points, home)
    if navigation_points.present?
      google_latitude = navigation_points[0]['location']['latitude']
      google_longitude = navigation_points[0]['location']['longitude']

      point1 = [google_latitude, google_longitude]
      point2 = [home.latitude, home.longitude]

      Geocoder::Calculations.distance_between(point1, point2)
    end
  end

  def self.find_address_in_google_api(address, home)
    url = "https://maps.googleapis.com/maps/api/geocode/json?key=#{GEOCODER_API_KEY}&address=#{address}"
    response = HTTParty.get(url)

    distances = response['results'].map do |result|
      calculate_distance_between_google_result_and_home(result['navigation_points'], home)
    end

    # Assumes there is always a Google API result returned, but not necessarily one with a lat/lng
    chosen_result = response['results'][0]
    chosen_distance = distances[0]

    distances.each_with_index do |distance, i|
      if distance.present? && (chosen_distance.nil? || distance < chosen_distance)
        chosen_result = response['results'][i]
        chosen_distance = distance
      end
    end

    # Return the closest option (or nil) when there are multiple results
    chosen_result
  end

  def self.street_number(result)
    find_address_component(result, 'street_number')[0]['long_name']
  end

  def self.street_name(result)
    find_address_component(result, 'route')[0]['long_name']
  end

  def self.city(result)
    find_address_component(result, 'locality')[0]['long_name']
  end

  def self.find_address_component(result, type)
    result['address_components'].select { |component| component['types'].include?(type) }
  end
end

# rubocop:enable all