require 'rails_helper'

RSpec.describe SurveyVisitsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/survey_visits').to route_to('survey_visits#index')
    end

    it 'routes to #new' do
      expect(get: '/survey_visits/new').to route_to('survey_visits#new')
    end

    it 'routes to #show' do
      expect(get: '/survey_visits/1').to route_to('survey_visits#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/survey_visits/1/edit').to route_to('survey_visits#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/survey_visits').to route_to('survey_visits#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/survey_visits/1').to route_to('survey_visits#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/survey_visits/1').to route_to('survey_visits#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/survey_visits/1').to route_to('survey_visits#destroy', id: '1')
    end
  end
end
