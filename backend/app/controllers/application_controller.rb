# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  
  # this fixed user creation but I have no idea WHY
  respond_to :html, :json
end
