# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CanonicalizeAddressJob, type: :job do
  let(:home) { create(:home) }
  it 'canonicalizes an address properly' do
    CanonicalizeAddressJob.perform_now(home.id)
    home.reload
    expect(home.street_number).not_to be_nil
  end
end
