# frozen_string_literal: true

class SurveyQuestionsController < ApplicationController
  before_action :set_survey_question, only: %i[show update destroy]

  # GET /survey_questions or /survey_questions.json
  def index
    @survey_questions = policy_scope(SurveyQuestion).all
  end

  # GET /survey_questions/1 or /survey_questions/1.json
  def show; end

  # POST /survey_questions or /survey_questions.json
  def create
    @survey_question = SurveyQuestion.new(survey_question_params)

    if @survey_question.save
      render :show, status: :created, location: @survey_question
    else
      render json: @survey_question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /survey_questions/1 or /survey_questions/1.json
  def update
    if @survey_question.update(survey_question_params)
      render :show, status: :ok, location: @survey_question
    else
      render json: @survey_question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /survey_questions/1 or /survey_questions/1.json
  def destroy
    @survey_question.destroy
    head :no_content
  end

  private

  def set_survey_question
    @survey_question = SurveyQuestion.find(params[:id])
    authorize @survey_question
  end

  def survey_question_params
    params.require(:survey_question).permit(:text, :response_type, :response_options, :survey_id)
  end
end
