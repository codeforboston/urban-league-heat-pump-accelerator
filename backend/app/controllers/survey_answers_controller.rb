# frozen_string_literal: true

class SurveyAnswersController < ApplicationController
  before_action :set_survey_answer, only: %i[show edit update destroy]

  # GET /survey_answers or /survey_answers.json
  def index
    @survey_answers = SurveyAnswer.all
  end

  # GET /survey_answers/1 or /survey_answers/1.json
  def show; end

  # GET /survey_answers/new
  def new
    @survey_answer = SurveyAnswer.new
  end

  # GET /survey_answers/1/edit
  def edit; end

  # POST /survey_answers or /survey_answers.json
  def create
    @survey_answer = SurveyAnswer.new(survey_answer_params)

    respond_to do |format|
      if @survey_answer.save
        format.json { render :show, status: :created, location: @survey_answer }
      else
        format.json { render json: @survey_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /survey_answers/1 or /survey_answers/1.json
  def update
    respond_to do |format|
      if @survey_answer.update(survey_answer_params)
        format.json { render :show, status: :ok, location: @survey_answer }
      else
        format.json { render json: @survey_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /survey_answers/1 or /survey_answers/1.json
  def destroy
    @survey_answer.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_survey_answer
    @survey_answer = SurveyAnswer.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def survey_answer_params
    params.require(:survey_answer).permit(:answer, :survey_response_id, :survey_question_id)
  end
end
