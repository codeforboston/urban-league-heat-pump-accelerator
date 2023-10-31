# frozen_string_literal: true

if Rails.env.development?
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'
      resource  '*',
                headers: :any,
                methods: %i[get post patch put options delete],
                expose: %w[access-token expiry token-type Authorization]
    end
  end
else
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'https://www.bostonhpa.org'
      resource  '*',
                headers: :any,
                methods: %i[get post patch put options delete],
                expose: %w[access-token expiry token-type Authorization]
    end
  end
end
