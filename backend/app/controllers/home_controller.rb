# frozen_string_literal: true

class HomeController < ApplicationController
  skip_after_action :verify_authorized
  skip_after_action :verify_policy_scoped

  def index
    render json: { status: 'ok' }, status: :ok
  end
end
