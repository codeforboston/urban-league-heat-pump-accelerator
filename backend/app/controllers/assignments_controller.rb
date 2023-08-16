# frozen_string_literal: true

class AssignmentsController < ApplicationController
  before_action :set_assignment, only: %i[show edit update destroy]

  # GET /assignments or /assignments.json
  def index
    coll = Assignment.includes(homes: { survey_visits: :survey_response })

    @assignments = if search_params[:surveyor_id]
                     coll.filter_by_surveyor [search_params[:surveyor_id]]
                   else
                     coll.all
                   end
  end

  # GET /assignments/1 or /assignments/1.json
  def show; end

  # GET /assignments/new
  def new
    @assignment = Assignment.new
  end

  # GET /assignments/1/edit
  def edit; end

  # POST /assignments or /assignments.json
  def create
    @assignment = Assignment.new(assignment_params)

    respond_to do |format|
      if @assignment.save
        format.json { render :show, status: :created, location: @assignment }
      else
        format.json { render json: @assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /assignments/1 or /assignments/1.json
  def update
    respond_to do |format|
      if @assignment.update(assignment_params)
        format.json { render :show, status: :ok, location: @assignment }
      else
        format.json { render json: @assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /assignments/1 or /assignments/1.json
  def destroy
    @assignment.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_assignment
    @assignment = Assignment.includes(homes: { survey_visits: :survey_response }).find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def assignment_params
    params.require(:assignment).permit(:group, :region_code, :geocode, surveyor_ids: [])
  end

  def search_params
    params.permit(:surveyor_id)
  end
end
