class SurveyQuestionsController < ApplicationController
  before_action :set_survey_question, only: %i[show edit update destroy]

  # GET /survey_questions or /survey_questions.json
  def index
    @survey_questions = SurveyQuestion.all
  end

  # GET /survey_questions/1 or /survey_questions/1.json
  def show; end

  # GET /survey_questions/new
  def new
    @survey_question = SurveyQuestion.new
  end

  # GET /survey_questions/1/edit
  def edit; end

  # POST /survey_questions or /survey_questions.json
  def create
    @survey_question = SurveyQuestion.new(survey_question_params)

    respond_to do |format|
      if @survey_question.save
        format.html do
          redirect_to survey_question_url(@survey_question), notice: 'Survey question was successfully created.'
        end
        format.json { render :show, status: :created, location: @survey_question }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @survey_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /survey_questions/1 or /survey_questions/1.json
  def update
    respond_to do |format|
      if @survey_question.update(survey_question_params)
        format.html do
          redirect_to survey_question_url(@survey_question), notice: 'Survey question was successfully updated.'
        end
        format.json { render :show, status: :ok, location: @survey_question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @survey_question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /survey_questions/1 or /survey_questions/1.json
  def destroy
    @survey_question.destroy

    respond_to do |format|
      format.html { redirect_to survey_questions_url, notice: 'Survey question was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_survey_question
    @survey_question = SurveyQuestion.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def survey_question_params
    params.require(:survey_question).permit(:text, :response_type, :response_options, :survey_id)
  end
end
