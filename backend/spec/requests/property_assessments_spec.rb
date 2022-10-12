# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PropertyAssessments', type: :request do
  describe 'GET /index' do
    it 'can return a JSON of PropertyAssessments' do
      get '/property_assessments.json'
      expect(response.content_type).to include('application/json')
      expect(response).to have_http_status(:ok)
    end
  end
end
