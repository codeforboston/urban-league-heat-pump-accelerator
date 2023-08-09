# frozen_string_literal: true

# https://stackoverflow.com/questions/1089134/how-do-i-update-a-has-and-belongs-to-many-collection-restfully
class AssignmentsSurveyorsController < ApplicationController
  def create
    @surveyor = Surveyor.find(params[:surveyor_id])
    @assignments = Assignment.find(params[:assignment_ids])

    @surveyor.assignments << @assignments
    @surveyor.assignments = @surveyor.assignments.uniq

    respond_to do |format|
      if @surveyor.save
        format.json { head :no_content, status: :created }
      else
        format.json { render json: @surveyor.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @surveyor = Surveyor.find(params[:surveyor_id])
    @assignments = @surveyor.assignments.find(params[:assignment_ids])
    @surveyor.assignments.delete(@assignments)

    respond_to do |format|
      if @surveyor.save
        format.json { head :no_content }
      else
        format.json { render json: @surveyor.errors, status: :unprocessable_entity }
      end
    end
  end
end
