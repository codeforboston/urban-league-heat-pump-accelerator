# frozen_string_literal: true

class SurveysController < ApplicationController
  before_action :set_survey, only: %i[show edit update destroy]
  before_action :sanitize_lang_pref, only: :show

  # GET /surveys or /surveys.json
  def index
    @surveys = policy_scope(Survey).includes(:survey_questions).all
  end

  # GET /surveys/1 or /surveys/1.json
  def show
    @language_code = params[:langPref] || http_accept_language.preferred_language_from(
      @survey.survey_questions.first.localized_survey_questions.distinct.pluck(:language_code)
    )

    @survey_mode = params[:survey_mode] || 'online'

    # If first question of survey doesn't have this localization and survey mode, then throw exception
    # (No need to check all questions for this localization and survey mode)
    return unless @survey.survey_questions.first.localized_survey_questions.find_by(
      language_code: @language_code, survey_mode: @survey_mode
    ).nil?

    respond_to do |format|
      format.json do
        render json: "{ \"status\": \"Survey #{@survey.id} does not have localization #{@language_code} for " \
                  "#{@survey_mode} mode\" }",
               status: :not_found
      end
    end
  end

  # GET /surveys/new
  def new
    @survey = Survey.new
  end

  # GET /surveys/1/edit
  def edit; end

  # POST /surveys or /surveys.json
  def create
    @survey = Survey.new(survey_params)
    authorize @survey

    respond_to do |format|
      if @survey.save
        format.json { render :show, status: :created, location: @survey }
      else
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /surveys/1 or /surveys/1.json
  def update
    respond_to do |format|
      if @survey.update(survey_params)
        format.json { render :show, status: :ok, location: @survey }
      else
        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /surveys/1 or /surveys/1.json
  def destroy
    @survey.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # TODO: Remove this when frontend switches to requesting 'en' language code
  def sanitize_lang_pref
    return unless params[:langPref] == 'en-US'

    params[:langPref] = 'en'
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_survey
    @survey = Survey.find(params[:id])
    authorize @survey
  end

  # Only allow a list of trusted parameters through.
  def survey_params
    params.require(:survey).permit(:title)
  end
end
