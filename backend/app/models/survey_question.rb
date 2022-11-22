class SurveyQuestion < ApplicationRecord
  belongs_to :survey
  enum response_type: [:radio, :text]
end
