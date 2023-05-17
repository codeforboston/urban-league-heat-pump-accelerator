# frozen_string_literal: true

class AddRecaptchaScoreToSurveyResponse < ActiveRecord::Migration[7.0]
  def change
    add_column :survey_responses, :recaptcha_score, :float
  end
end
