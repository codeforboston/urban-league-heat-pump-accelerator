require 'rails_helper'

RSpec.describe "homes/index", type: :view do
  before(:each) do
    assign(:homes, [
      Home.create!(
        street_number: "Street Number",
        street_name: "Street Name",
        unit_number: "Unit Number",
        city: "City",
        state: "State",
        zip_code: "Zip Code",
        building_type: "Building Type"
      ),
      Home.create!(
        street_number: "Street Number",
        street_name: "Street Name",
        unit_number: "Unit Number",
        city: "City",
        state: "State",
        zip_code: "Zip Code",
        building_type: "Building Type"
      )
    ])
  end

  it "renders a list of homes" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
    assert_select cell_selector, text: Regexp.new("Street Number".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Street Name".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Unit Number".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("City".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("State".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Zip Code".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Building Type".to_s), count: 2
  end
end
