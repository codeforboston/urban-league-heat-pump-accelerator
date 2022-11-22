# frozen_string_literal: true

class SurveyVisitsController < ApplicationController
  before_action :set_survey_visit, only: %i[show edit update destroy]

  # GET /survey_visits or /survey_visits.json
  def index
    @survey_visits = SurveyVisit.all
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

    respond_to do |format|
      if @survey_visit.save
        format.html { redirect_to survey_visit_url(@survey_visit), notice: 'Survey visit was successfully created.' }
        format.json { render :show, status: :created, location: @survey_visit }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @survey_visit.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /survey_visits/1 or /survey_visits/1.json
  def update
    respond_to do |format|
      if @survey_visit.update(survey_visit_params)
        format.html { redirect_to survey_visit_url(@survey_visit), notice: 'Survey visit was successfully updated.' }
        format.json { render :show, status: :ok, location: @survey_visit }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @survey_visit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /survey_visits/1 or /survey_visits/1.json
  def destroy
    @survey_visit.destroy

    respond_to do |format|
      format.html { redirect_to survey_visits_url, notice: 'Survey visit was successfully destroyed.' }
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
    params.require(:survey_visit).permit(:user_id, :completed)
  end
end
