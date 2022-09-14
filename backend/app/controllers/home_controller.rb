# frozen_string_literal: true

# Implement controller for the home route.
class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    redirect_to new_user_session_path unless current_user
  end
end
