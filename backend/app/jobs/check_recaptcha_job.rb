# frozen_string_literal: true

require 'net/https'

class CheckRecaptchaJob < ApplicationJob
  queue_as :default

  include CheckRecaptcha

  def perform(survey_response_id, response_token, recaptcha_action)
    secret_key = Rails.application.credentials['recaptcha_secret_key']

    score = check_recaptcha secret_key, response_token, recaptcha_action

    survey_response = SurveyResponse.find(survey_response_id)
    survey_response.score = score
    survey_response.save
  end
end
