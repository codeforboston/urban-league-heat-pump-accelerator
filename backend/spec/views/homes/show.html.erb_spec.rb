require 'rails_helper'

RSpec.describe "homes/show", type: :view do
  before(:each) do
    assign(:home, Home.create!(
      street_number: "Street Number",
      street_name: "Street Name",
      unit_number: "Unit Number",
      city: "City",
      state: "State",
      zip_code: "Zip Code",
      building_type: "Building Type"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Street Number/)
    expect(rendered).to match(/Street Name/)
    expect(rendered).to match(/Unit Number/)
    expect(rendered).to match(/City/)
    expect(rendered).to match(/State/)
    expect(rendered).to match(/Zip Code/)
    expect(rendered).to match(/Building Type/)
  end
end
