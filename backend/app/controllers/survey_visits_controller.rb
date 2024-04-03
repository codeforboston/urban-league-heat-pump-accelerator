# frozen_string_literal: true

class SurveyVisitsController < ApplicationController
  before_action :set_survey_visit, only: %i[show edit update destroy]

  # GET /survey_visits or /survey_visits.json
  def index
    @survey_visits = policy_scope(SurveyVisit).where(search_params)
  end

  # GET /survey_visits/1 or /survey_visits/1.json
  def show; end

  # GET /survey_visits/new
  def new
    @survey_visit = SurveyVisit.new
    authorize @survey_visit
  end

  # POST /survey_visits or /survey_visits.json
  def create # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    params_hash = survey_visit_params.to_h
    params_hash[:survey_response_attributes][:ip] = request.ip if params_hash.key?(:survey_response_attributes)
    @survey_visit = SurveyVisit.new(params_hash)
    authorize @survey_visit

    # If authenticated and have a survey response,
    # always consider it trustworthy
    @survey_visit.survey_response.recaptcha_score = 1.0 if user_signed_in? && !@survey_visit.survey_response.nil?

    respond_to do |format|
      if @survey_visit.save
        format.json { render :show, status: :created, location: @survey_visit }

        # We only verify the reCAPTCHA token if the user is anonymous
        unless user_signed_in?
          actual_response_token = request.headers['Recaptcha-Token']
          recaptcha_action = 'create_survey'

          # If we have a survey_response, schedule the reCAPTCHA check
          # in the background
          unless @survey_visit.survey_response.nil?
            CheckRecaptchaJob.perform_later @survey_visit.survey_response.id, actual_response_token, recaptcha_action
          end
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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_survey_visit
    @survey_visit = SurveyVisit.find(params[:id])
    authorize @survey_visit
  end

  # Only allow a list of trusted parameters through.
  def survey_visit_params
    params.require(:survey_visit)
          .permit(:surveyor_id, :home_id,
                  survey_response_attributes: [:survey_id,
                                               { survey_answers_attributes: %i[survey_question_id answer] }])
  end

  def search_params
    params.permit(:surveyor_id, :home_id)
  end
end
