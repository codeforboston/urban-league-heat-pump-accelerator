require 'rails_helper'

RSpec.describe "homes/edit", type: :view do
  let(:home) {
    Home.create!(
      street_number: "MyString",
      street_name: "MyString",
      unit_number: "MyString",
      city: "MyString",
      state: "MyString",
      zip_code: "MyString",
      building_type: "MyString"
    )
  }

  before(:each) do
    assign(:home, home)
  end

  it "renders the edit home form" do
    render

    assert_select "form[action=?][method=?]", home_path(home), "post" do

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
