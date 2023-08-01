# frozen_string_literal: true

require 'net/https'

module CheckRecaptcha
  def check_recaptcha(secret_key, response_token, recaptcha_action)
    # Verify reCAPTCHA token per https://developers.google.com/recaptcha/docs/verify
    uri = URI.parse('https://www.google.com/recaptcha/api/siteverify')

    response = Net::HTTP.post(uri, 'secret' => secret_key, 'response' => response_token)
    json = JSON.parse(response.body)

    # If have invalid token, consider maximum spaminess
    unless json['success']
      Rails.logger.error 'Invalid reCAPTCHA token'
      return 0
    end

    # If wrong action, then consider maximum spaminess
    unless json['action'] == recaptcha_action
      Rails.logger.error 'Incorrect reCAPTCHA action'
      return 0
    end

    Rails.logger.info "Received reCAPTCHA score #{json['score']}"
    json['score']
  end
end
