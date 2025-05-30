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

RSpec.describe '/surveys', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Survey. As you add validations to Survey, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Survey.create! valid_attributes
      get surveys_url, as: :json
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    before do
      localized_survey_question = create(:localized_survey_question, language_code: 'valid_code', text: 'ABC')
      survey_question = localized_survey_question.survey_question
      create(:localized_survey_question, survey_question: survey_question, language_code: 'valid_code_2', text: 'DEF')
      create(:localized_survey_question, survey_question: survey_question, language_code: 'valid_code',
                                         survey_mode: 'other', text: 'GHI')

      @survey = survey_question.survey
    end

    it 'renders a successful response' do
      get survey_url(@survey, langPref: 'valid_code'), as: :json
      expect(response).to be_successful

      response_body = JSON.parse(response.body)
      expect(response_body['survey_questions'].length).to eq(1)
      expect(response_body['survey_questions'][0]['question']).to eq('ABC')
    end

    it 'return a localized survey using the langPref param' do
      get survey_url(@survey, langPref: 'valid_code_2'), as: :json
      expect(JSON.parse(response.body)['survey_questions'][0]['question']).to eq('DEF')
    end

    it 'return a specialized survey using the survey_mode param' do
      get survey_url(@survey, langPref: 'valid_code', survey_mode: 'other'), as: :json
      expect(JSON.parse(response.body)['survey_questions'][0]['question']).to eq('GHI')
    end

    it 'renders a 404 not found if langPref not found' do
      get survey_url(@survey, langPref: 'invalid_code'), as: :json
      expect(response).to have_http_status(:not_found)
    end

    it 'renders a 404 not found if survey_mode not found' do
      get survey_url(@survey, langPref: 'valid_code', survey_mode: 'invalid_mode'), as: :json
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Survey' do
        expect do
          post surveys_url, params: { survey: valid_attributes }, as: :json
        end.to change(Survey, :count).by(1)
      end

      it 'redirects to the created survey' do
        post surveys_url, params: { survey: valid_attributes }, as: :json
        expect(response).to redirect_to(survey_url(Survey.last))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Survey' do
        expect do
          post surveys_url, params: { survey: invalid_attributes }, as: :json
        end.to change(Survey, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post surveys_url, params: { survey: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested survey' do
        survey = Survey.create! valid_attributes
        patch survey_url(survey), params: { survey: new_attributes }, as: :json
        survey.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the survey' do
        survey = Survey.create! valid_attributes
        patch survey_url(survey), params: { survey: new_attributes }, as: :json
        survey.reload
        expect(response).to redirect_to(survey_url(survey))
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        survey = Survey.create! valid_attributes
        patch survey_url(survey), params: { survey: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested survey' do
      survey = Survey.create! valid_attributes
      expect do
        delete survey_url(survey), as: :json
      end.to change(Survey, :count).by(-1)
    end

    it 'redirects to the surveys list' do
      survey = Survey.create! valid_attributes
      delete survey_url(survey), as: :json
      expect(response).to redirect_to(surveys_url)
    end
  end
end
