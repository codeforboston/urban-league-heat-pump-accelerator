# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyResponse, type: :model do
  it 'validates language code is an accepted value if not null' do
    survey_response = build(:survey_response, language_code: 'foo')
    survey_response.valid?
    expect(survey_response.errors.full_messages).to include('Language code is not included in the list')
  end
end
