require 'rails_helper'

RSpec.describe "surveyors/index", type: :view do
  before(:each) do
    assign(:surveyors, [
      Surveyor.create!(
        user: nil,
        firstname: "Firstname",
        lastname: "Lastname",
        email: "Email",
        phone: "Phone",
        street_address: "Street Address",
        geocode: "Geocode",
        city: "City",
        zipcode: "Zipcode",
        state: "State",
        role: "Role",
        status: "Status"
      ),
      Surveyor.create!(
        user: nil,
        firstname: "Firstname",
        lastname: "Lastname",
        email: "Email",
        phone: "Phone",
        street_address: "Street Address",
        geocode: "Geocode",
        city: "City",
        zipcode: "Zipcode",
        state: "State",
        role: "Role",
        status: "Status"
      )
    ])
  end

  it "renders a list of surveyors" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Firstname".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Lastname".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Email".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Phone".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Street Address".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Geocode".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("City".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Zipcode".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("State".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Role".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Status".to_s), count: 2
  end
end
