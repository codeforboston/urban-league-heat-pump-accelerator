require 'rails_helper'

RSpec.describe SurveysController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/surveys').to route_to('surveys#index')
    end

    it 'routes to #new' do
      expect(get: '/surveys/new').to route_to('surveys#new')
    end

    it 'routes to #show' do
      expect(get: '/surveys/1').to route_to('surveys#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/surveys/1/edit').to route_to('surveys#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/surveys').to route_to('surveys#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/surveys/1').to route_to('surveys#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/surveys/1').to route_to('surveys#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/surveys/1').to route_to('surveys#destroy', id: '1')
    end
  end
end
