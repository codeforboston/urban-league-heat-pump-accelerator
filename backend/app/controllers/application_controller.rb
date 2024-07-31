# frozen_string_literal: true

class ApplicationController < ActionController::API
  # before_action :authenticate_user!
  include Pundit::Authorization
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  # this fixed user creation but I have no idea WHY
  respond_to :html, :json
end
