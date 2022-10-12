# frozen_string_literal: true

# Property Assessments from the City of Boston
class PropertyAssessmentsController < ApplicationController
  def index
    @property_assessments = PropertyAssessment.all
    respond_to do |format|
      format.html
      format.json { render json: @property_assessments.first(20) }
    end
  end
end
