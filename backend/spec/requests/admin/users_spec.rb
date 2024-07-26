# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/admin/users', type: :request do
  describe 'POST /create' do
    context 'with valid parameters for a surveyor' do
      let(:valid_attributes) do
        {
          email: 'alice@example.com',
          role: 'surveyor',
          surveyor: {
            city: 'Boston',
            firstname: 'Alice',
            lastname: 'Smith',
            phone: '1234567890',
            state: 'MA',
            street_address: '1 Main St',
            zipcode: '02110'
          }
        }
      end

      it 'creates a new user who is a surveyor' do
        expect do
          post admin_users_url, params: { user: valid_attributes }, as: :json
        end.to change(User, :count).by(1)

        user = User.last
        expect(user.email).to eq('alice@example.com')
        expect(user.role).to eq('surveyor')
        expect(user.surveyor).to be_present

        surveyor = user.surveyor
        expect(surveyor.city).to eq('Boston')
        expect(surveyor.firstname).to eq('Alice')
        expect(surveyor.lastname).to eq('Smith')
        expect(surveyor.phone).to eq('1234567890')
        expect(surveyor.state).to eq('MA')
        expect(surveyor.street_address).to eq('1 Main St')
        expect(surveyor.zipcode).to eq('02110')
      end

      it 'redirects to the created user' do
        post admin_users_url, params: { user: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context 'with valid parameters for an admin' do
      let(:valid_attributes) do
        {
          email: 'bob@example.com',
          role: 'admin'
        }
      end

      it 'creates a new user who is an admin' do
        expect do
          post admin_users_url, params: { user: valid_attributes }, as: :json
        end.to change(User, :count).by(1)

        user = User.last
        expect(user.email).to eq('bob@example.com')
        expect(user.role).to eq('admin')
      end

      it 'redirects to the created user' do
        post admin_users_url, params: { user: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_attributes) do
        {
          email: '',
          role: 'admin'
        }
      end

      it 'does not create a new user' do
        expect do
          post admin_users_url, params: { user: invalid_attributes }, as: :json
        end.to change(User, :count).by(0)
      end

      it 'renders a response with 422 status' do
        post admin_users_url, params: { user: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)

        error_message = JSON.parse(response.body)['email'][0]
        expect(error_message).to eq("can't be blank")
      end
    end
  end
end
