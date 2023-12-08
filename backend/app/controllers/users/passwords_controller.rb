# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    respond_to :json

    def create
<<<<<<< HEAD
      debugger
=======
>>>>>>> main
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
<<<<<<< HEAD
end
=======
end
>>>>>>> main
