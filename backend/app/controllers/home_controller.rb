# frozen_string_literal: true

# Implement controller for the home route.
class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    if current_user
      # redirect_to go to app page?
    else
      redirect_to new_user_session_path
    end
  end
end
