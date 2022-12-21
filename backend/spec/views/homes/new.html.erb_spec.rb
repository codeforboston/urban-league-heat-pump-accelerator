require 'rails_helper'

RSpec.describe "homes/new", type: :view do
  before(:each) do
    assign(:home, Home.new(
      street_number: "MyString",
      street_name: "MyString",
      unit_number: "MyString",
      city: "MyString",
      state: "MyString",
      zip_code: "MyString",
      building_type: "MyString"
    ))
  end

  it "renders new home form" do
    render

    assert_select "form[action=?][method=?]", homes_path, "post" do

      assert_select "input[name=?]", "home[street_number]"

      assert_select "input[name=?]", "home[street_name]"

      assert_select "input[name=?]", "home[unit_number]"

      assert_select "input[name=?]", "home[city]"

      assert_select "input[name=?]", "home[state]"

      assert_select "input[name=?]", "home[zip_code]"

      assert_select "input[name=?]", "home[building_type]"
    end
  end
end
