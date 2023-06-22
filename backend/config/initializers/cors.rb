# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource  '*',
              headers: :any,
              methods: %i[get post patch put options],
              expose: %w[access-token expiry token-type Authorization]
  end
end
