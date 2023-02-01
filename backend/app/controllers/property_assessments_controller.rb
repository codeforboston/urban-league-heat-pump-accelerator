# frozen_string_literal: true

# Property Assessments from the City of Boston
class PropertyAssessmentsController < ApplicationController
  
  # GET /property_assessments or /property_assessments.json
  def index
    @property_assessments = PropertyAssessment.all.first(30)
    respond_to do |format|
      format.html
      format.json { render json: @property_assessments.first(20) }
    end
  end

  # GET /property_assessments/1 or /property_assessments/1.json
  def show; end

  # POST /property_assessments or /property_assessments.json
  def create
    @property_assessment = PropertyAssessment.new(property_assessment_params)
    
    respond_to do |format|
      if @property_assessment.save
        format.json { render :show, status: :created, location: @property_assessment }
      else
        format.json { render json: @property_assessment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /property_assessments/1 or /property_assessments/1.json
  def update
    respond_to do |format|
      if @property_assessment.update(property_assessment_params)
        format.json { render :show, status: :ok, location: @property_assessment }
      else
        format.json { render json: @property_assessment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /property_assessments/1 or /property_assessments/1.json
  def destroy
    @property_assessment.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def search_params
    params.permit(:yearbuilt, :heattype, :heatfuel, :heattype)
  end

end
