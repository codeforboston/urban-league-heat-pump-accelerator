# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json
    include Pundit::Authorization

    def create
      skip_authorization
      super
    end

    private

    def respond_with(resource, _opts = {})
      render json: resource
    end

    def respond_to_on_destroy
      head :no_content
    end
  end
end
