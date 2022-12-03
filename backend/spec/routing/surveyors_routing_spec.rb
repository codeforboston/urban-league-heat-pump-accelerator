# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyorsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/surveyors').to route_to('surveyors#index')
    end

    it 'routes to #new' do
      expect(get: '/surveyors/new').to route_to('surveyors#new')
    end

    it 'routes to #show' do
      expect(get: '/surveyors/1').to route_to('surveyors#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/surveyors/1/edit').to route_to('surveyors#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/surveyors').to route_to('surveyors#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/surveyors/1').to route_to('surveyors#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/surveyors/1').to route_to('surveyors#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/surveyors/1').to route_to('surveyors#destroy', id: '1')
    end
  end
end
