# frozen_string_literal: true

require 'net/https'

module CheckRecaptcha
  def check_recaptcha(secret_key, response_token, recaptcha_action)
    uri = URI.parse("https://www.google.com/recaptcha/api/siteverify?secret=#{secret_key}&response=#{response_token}")
    response = Net::HTTP.get_response(uri)
    json = JSON.parse(response.body)

    # TODO: What to do if not successful validating?
    # i.e. sucess == false or action doesn't match?
    return 0 unless json['success']
    return 0 if json['action'] != recaptcha_action

    json['score']
  end
end
