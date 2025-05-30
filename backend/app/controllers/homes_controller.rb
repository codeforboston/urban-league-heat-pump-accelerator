# frozen_string_literal: true

class HomesController < ApplicationController
  before_action :set_home, only: %i[show edit update destroy]

  # GET /homes or /homes.json
  def index
    @homes = policy_scope(Home).includes(survey_visits: :survey_response).where(search_params)
  end

  # GET /homes/1 or /homes/1.json
  def show; end

  # GET /homes/new
  def new
    @home = Home.new
    authorize @home
  end

  # POST /homes or /homes.json
  def create
    @home = Home.new(home_params)
    authorize @home

    # If the user isn't signed in and we're creating a new home, mark as user added
    @home.user_added = true unless user_signed_in?

    respond_to do |format|
      if @home.save
        format.json { render :show, status: :created, location: @home }
      else
        format.json { render json: @home.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /homes/1 or /homes/1.json
  def update
    respond_to do |format|
      if @home.update(home_params)
        format.json { render :show, status: :ok, location: @home }
      else
        format.json { render json: @home.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /homes/1 or /homes/1.json
  def destroy
    @home.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_home
    @home = Home.includes(survey_visits: :survey_response).find(params[:id])
    authorize @home
  end

  # Only allow a list of trusted parameters through.
  # Do NOT permit "user-added" because this is something we set.
  def home_params
    params.require(:home).permit(:street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type,
                                 :assignment_id, :visit_order)
  end

  def search_params
    params.permit(:id, :street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type,
                  :user_added, :assignment_id, :visit_order)
  end
end
