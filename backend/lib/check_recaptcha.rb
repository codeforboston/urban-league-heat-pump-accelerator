# frozen_string_literal: true

require 'net/https'

module CheckRecaptcha
  def check_recaptcha(secret_key, response_token, recaptcha_action)
    # Verify reCAPTCHA token per https://developers.google.com/recaptcha/docs/verify
    uri = URI.parse('https://www.google.com/recaptcha/api/siteverify')

    response = Net::HTTP.post(uri, 'secret' => secret_key, 'response' => response_token)
    json = JSON.parse(response.body)

    # TODO: What to do if not successful validating?
    # i.e. sucess == false or action doesn't match?
    return 0 unless json['success']
    return 0 if json['action'] != recaptcha_action

    json['score']
  end
end
