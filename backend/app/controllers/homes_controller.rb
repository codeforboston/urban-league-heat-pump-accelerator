# frozen_string_literal: true

class HomesController < ApplicationController
  before_action :set_home, only: %i[show edit update destroy]

  # GET /homes or /homes.json
  def index
    @homes = Home.where(search_params)
  end

  # GET /homes/1 or /homes/1.json
  def show; end

  # GET /homes/new
  def new
    @home = Home.new
  end

  # GET /homes/1/edit
  def edit; end

  # POST /homes or /homes.json
  def create
    @home = Home.new(home_params)
    @home.canonicalized = false

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
    unless home_params.keys.intersection(%w[street_number street_name unit_number city state
                                            zip_code]).empty?
      home_params[:canonicalized] = false
    end

    respond_to do |format|
      if @home.update(home_params)
        format.json { render :show, status: :ok, location: @home }
        # TODO: update
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
    @home = Home.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  # Do NOT permit "canonicalized" because this is something we set.
  def home_params
    params.require(:home).permit(:street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type,
                                 :assignment_id, :visit_order)
  end

  def search_params
    params.permit(:street_number, :street_name, :unit_number, :city, :state, :zip_code, :building_type, :assignment_id,
                  :visit_order, :canonicalized)
  end
end
