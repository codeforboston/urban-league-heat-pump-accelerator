Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # allow GET/POST/PATCH/PUT from any origin/resource
  allow do
    origins '*'
    resource '*', headers: :any, methods: :any, expose: ["Authorization"]

  end
end