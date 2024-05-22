# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    respond_to :json
    include Pundit::Authorization

    def create
      skip_authorization
      super
    end

    def update
      skip_authorization
      super
    end

    def validate_reset_token
      skip_authorization
      @user = User.with_reset_password_token(params[:reset_password_token])

      if @user
        head :ok
      else
        head :unprocessable_entity
      end
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
