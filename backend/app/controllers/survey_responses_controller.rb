# frozen_string_literal: true

class SurveyResponsesController < ApplicationController
  before_action :set_survey_response, only: %i[show edit update destroy]

  # GET /survey_responses or /survey_responses.json
  def index
    @survey_responses = SurveyResponse.all
  end

  # GET /survey_responses/1 or /survey_responses/1.json
  def show; end

  # GET /survey_responses/new
  def new
    @survey_response = SurveyResponse.new
  end

  # GET /survey_responses/1/edit
  def edit; end

  # POST /survey_responses or /survey_responses.json
  def create
    params_hash = survey_response_params.to_h
    params_hash[:ip] = request.ip
    @survey_response = SurveyResponse.new(params_hash)

    respond_to do |format|
      if @survey_response.save
        format.html do
          redirect_to survey_response_url(@survey_response), notice: 'Survey response was successfully created.'
        end
        format.json { render :show, status: :created, location: @survey_response }
      else
        format.json { render json: @survey_response.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /survey_responses/1 or /survey_responses/1.json
  def update
    respond_to do |format|
      if @survey_response.update(survey_response_params)
        format.html do
          redirect_to survey_response_url(@survey_response), notice: 'Survey response was successfully updated.'
        end
        format.json { render :show, status: :ok, location: @survey_response }
      else
        format.json { render json: @survey_response.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /survey_responses/1 or /survey_responses/1.json
  def destroy
    @survey_response.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_survey_response
    @survey_response = SurveyResponse.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def survey_response_params
    params.require(:survey_response).permit(:survey_id, :survey_visit_id, :completed)
  end
end
