# frozen_string_literal: true

class SurveyVisitsController < ApplicationController
  before_action :set_survey_visit, only: %i[show edit update destroy]

  # GET /survey_visits or /survey_visits.json
  def index
    @survey_visits = SurveyVisit.where(search_params)
  end

  # GET /survey_visits/1 or /survey_visits/1.json
  def show; end

  # GET /survey_visits/new
  def new
    @survey_visit = SurveyVisit.new
  end

  # GET /survey_visits/1/edit
  def edit; end

  # POST /survey_visits or /survey_visits.json
  def create
    @survey_visit = SurveyVisit.new(survey_visit_params)

    # TODO: unpack reCAPTCHA user response token from request
    # (perhaps from headers?)
    actual_response_token = 'abc'
    recaptcha_action = 'def'

    respond_to do |format|
      if @survey_visit.save
        format.json { render :show, status: :created, location: @survey_visit }

        # If we have a survey_response, schedule the reCAPTCHA check
        # in the background
        unless @survey_visit.survey_response.nil?
          CheckRecaptchaJob.perform_later @survey_visit.survey_response_id, actual_response_token, recaptcha_action
        end
      else
        format.json { render json: @survey_visit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /survey_visits/1 or /survey_visits/1.json
  def update
    respond_to do |format|
      if @survey_visit.update(survey_visit_params)
        format.json { render :show, status: :ok, location: @survey_visit }
      else
        format.json { render json: @survey_visit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /survey_visits/1 or /survey_visits/1.json
  def destroy
    @survey_visit.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_survey_visit
    @survey_visit = SurveyVisit.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def survey_visit_params
    params.require(:survey_visit).permit(:user_id, :completed, :home_id)
  end

  def search_params
    params.permit(:user_id, :completed, :home_id)
  end
end
