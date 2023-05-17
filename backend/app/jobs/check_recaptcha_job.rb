# frozen_string_literal: true

require 'net/https'

class CheckRecaptchaJob < ApplicationJob
  queue_as :default

  def perform(survey_response_id, response_token, recaptcha_action)
    secret_key = 'abc'

    uri = URI.parse("https://www.google.com/recaptcha/api/siteverify?secret=#{secret_key}&response=#{response_token}")
    response = Net::HTTP.get_response(uri)
    json = JSON.parse(response.body)

    # TODO: What to do if not successful validating?
    # i.e. sucess == false or action doesn't match?
    assert json['success'] == true
    assert json['action'] == recaptcha_action

    survey_response = SurveyResponse.find(survey_response_id)
    survey_response.score = json['score']
    survey_response.save
  end
end
