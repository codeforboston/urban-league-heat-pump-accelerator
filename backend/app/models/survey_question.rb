# frozen_string_literal: true

class SurveyQuestion < ApplicationRecord
  belongs_to :survey
  enum response_type: { radio: 0, text: 1 }
end
