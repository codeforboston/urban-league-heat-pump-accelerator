# frozen_string_literal: true

# Surveyors are users of the surveying app, such as those who go door-to-door
class SurveyorsController < ApplicationController
  before_action :set_surveyor, only: %i[show edit update destroy]

  # GET /surveyors or /surveyors.json
  def index
    @surveyors = Surveyor.where(params.slice(:city, :zipcode, :state, :role, :status))
  end

  # GET /surveyors/1 or /surveyors/1.json
  def show; end

  # GET /surveyors/new
  def new
    @surveyor = Surveyor.new
  end

  # GET /surveyors/1/edit
  def edit; end

  # POST /surveyors or /surveyors.json
  def create
    @surveyor = Surveyor.new(surveyor_params)

    respond_to do |format|
      if @surveyor.save
        format.json { render json: @surveyor, status: :created }
      else
        format.json { render json: @surveyor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /surveyors/1 or /surveyors/1.json
  def update
    respond_to do |format|
      if @surveyor.update(surveyor_params)
        format.json { render :show, status: :ok, location: @surveyor }
      else
        format.json { render json: @surveyor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /surveyors/1 or /surveyors/1.json
  def destroy
    @surveyor.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_surveyor
    @surveyor = Surveyor.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def surveyor_params
    params.require(:surveyor).permit(:user_id, :firstname, :lastname, :email, :phone, :street_address, :geocode,
                                     :city, :zipcode, :state, :role, :status)
  end
end
