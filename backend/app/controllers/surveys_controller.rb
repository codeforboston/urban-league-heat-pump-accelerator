# frozen_string_literal: true

class SurveysController < ApplicationController
  AVAILABLE_LANGUAGES = %w(en es)
  before_action :set_survey, only: %i[show edit update destroy]

  # GET /surveys or /surveys.json
  def index
    @surveys = Survey.includes(:survey_questions).all
  end

  # GET /surveys/1 or /surveys/1.json
  def show
    @language_code = http_accept_language.preferred_language_from(AVAILABLE_LANGUAGES)
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

  # Use callbacks to share common setup or constraints between actions.
  def set_survey
    @survey = Survey.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def survey_params
    params.require(:survey).permit(:title)
  end
end
