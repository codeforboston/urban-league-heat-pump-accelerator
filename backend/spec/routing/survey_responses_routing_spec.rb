# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyResponsesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/survey_responses').to route_to('survey_responses#index')
    end

    it 'routes to #new' do
      expect(get: '/survey_responses/new').to route_to('survey_responses#new')
    end

    it 'routes to #show' do
      expect(get: '/survey_responses/1').to route_to('survey_responses#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/survey_responses/1/edit').to route_to('survey_responses#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/survey_responses').to route_to('survey_responses#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/survey_responses/1').to route_to('survey_responses#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/survey_responses/1').to route_to('survey_responses#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/survey_responses/1').to route_to('survey_responses#destroy', id: '1')
    end
  end
end
