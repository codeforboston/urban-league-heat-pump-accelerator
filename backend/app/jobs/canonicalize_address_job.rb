# frozen_string_literal: true

class CanonicalizeAddressJob < ApplicationJob
  queue_as :default

  # rubocop:disable Metrics/MethodLength
  def perform(home_id)
    home = Home.find(home_id)

    # Extract details from home to send to service
    _home_map = {
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

    # Regardless whether changes are needed,
    # we want to set canonicalized to true
    change_map[:canonicalized] = true
    home.update change_map
  end
  # rubocop:enable Metrics/MethodLength
end
