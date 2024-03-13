# frozen_string_literal: true

require 'rails_helper'

# #   def completed?
#     # We consider a home completed if any of its survey_visits
#     # have an associated survey_response
#     survey_visits.any? { |sv| !sv.survey_response.nil? }
#   end
RSpec.describe Home, type: :model do
  describe 'completed?' do
    it 'returns true if any survey visits have an associated survey_response' do
      home = build(:home, :with_completed_survey_visit)
      debugger
      expect(home.completed?).to be true
    end

    it 'returns false if no survey visits have an associated survey_response' do
      home = build(:home)
      expect(home.completed?).to be false
    end
  end
end
