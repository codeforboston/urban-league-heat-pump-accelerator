require 'rails_helper'

RSpec.describe "surveyors/show", type: :view do
  before(:each) do
    assign(:surveyor, Surveyor.create!(
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
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(//)
    expect(rendered).to match(/Firstname/)
    expect(rendered).to match(/Lastname/)
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/Phone/)
    expect(rendered).to match(/Street Address/)
    expect(rendered).to match(/Geocode/)
    expect(rendered).to match(/City/)
    expect(rendered).to match(/Zipcode/)
    expect(rendered).to match(/State/)
    expect(rendered).to match(/Role/)
    expect(rendered).to match(/Status/)
  end
end
