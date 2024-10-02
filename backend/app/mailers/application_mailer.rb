# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'help@bostonhpa.org'
  layout 'mailer'
end
