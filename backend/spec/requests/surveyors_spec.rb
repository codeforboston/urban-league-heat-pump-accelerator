# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

# rubocop:disable Metrics/BlockLength
RSpec.describe '/surveyors', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Surveyor. As you add validations to Surveyor, be sure to
  # adjust the attributes here as well.

  let(:user) do
    User.create(email: 'sample@test.com', password: 'password')
  end

  let(:valid_attributes) do
    {
      user_id: user.id,
      firstname: 'John',
      lastname: 'Smith',
      email: 'johnsmith@example.com',
      phone: '1234567890',
      street_address: '123 First Street',
      geocode: '40.714224,-73.961452',
      city: 'Cambridge',
      zipcode: '01234',
      state: 'MA',
      role: 'surveyor',
      status: 'active'
    }
  end

  let(:invalid_attributes) do
    {
      user_id: 'not a valid id'
    }
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Surveyor.create! valid_attributes
      get surveyors_url, as: :json
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      surveyor = Surveyor.create! valid_attributes
      get surveyor_url(surveyor), as: :json
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'renders a successful response' do
      surveyor = Surveyor.create! valid_attributes
      get edit_surveyor_url(surveyor), as: :json
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Surveyor' do
        expect do
          post surveyors_url, params: { surveyor: valid_attributes }, as: :json
        end.to change(Surveyor, :count).by(1)
      end

      it 'redirects to the created surveyor' do
        post surveyors_url, params: { surveyor: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Surveyor' do
        expect do
          post surveyors_url, params: { surveyor: invalid_attributes }, as: :json
        end.to change(Surveyor, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post surveyors_url, params: { surveyor: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        {
          user_id: user.id,
          firstname: 'John',
          lastname: 'Smith',
          email: 'johnsmith@example.com',
          phone: '1234567890',
          street_address: '123 First Street',
          geocode: '40.714224,-73.961452',
          city: 'Cambridge',
          zipcode: '01234',
          state: 'MA',
          role: 'surveyor',
          status: 'active'
        }
      end

      it 'updates the requested surveyor' do
        surveyor = Surveyor.create! valid_attributes
        patch surveyor_url(surveyor), params: { surveyor: new_attributes }, as: :json
        surveyor.reload
        expect(JSON.parse(response.body, { symbolize_names: true })).to include(new_attributes)
      end

      it 'redirects to the surveyor' do
        surveyor = Surveyor.create! valid_attributes
        patch surveyor_url(surveyor), params: { surveyor: new_attributes }, as: :json
        surveyor.reload
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        surveyor = Surveyor.create! valid_attributes
        patch surveyor_url(surveyor), params: { surveyor: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested surveyor' do
      surveyor = Surveyor.create! valid_attributes
      expect do
        delete surveyor_url(surveyor), as: :json
      end.to change(Surveyor, :count).by(-1)
    end

    it 'returns status no_content' do
      surveyor = Surveyor.create! valid_attributes
      delete surveyor_url(surveyor), as: :json
      expect(response).to have_http_status(:no_content)
    end
  end
end
# rubocop:enable Metrics/BlockLength
