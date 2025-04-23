# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/admin/exports', type: :request do
  include Devise::Test::IntegrationHelpers

  describe 'GET /export' do
    context 'as authorized user' do
      let(:admin) do
        User.create(email: 'admin@test.com', password: 'password', role: :admin)
      end

      before do
        sign_in admin
        create(:survey)
      end

      it 'returns a CSV' do
        get admin_export_url, params: { format: :csv }
        expect(response).to have_http_status(:success)

        expected_body = 'Survey Visit ID,Home ID,Successful Export,Public Survey,Assignment ID,' \
        'Assignment Surveyor IDs,Assignment Surveyor Names,Street Number,Street Name,' \
        'Unit Number,City,State,ZIP Code,Home Latitude,Home Longitude,Survey Visit Latitude,' \
        "Survey Visit Longitude,Survey Visit Time,Surveyor ID,Surveyor Name,Language Code\n"

        expect(response.body).to eq(expected_body)
      end
    end

    context 'as unauthorized user' do
      it 'raises an error' do
        expect do
          get admin_export_url
        end.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end
end
