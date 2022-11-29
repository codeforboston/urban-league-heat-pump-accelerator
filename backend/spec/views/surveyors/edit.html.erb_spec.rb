require 'rails_helper'

RSpec.describe "surveyors/edit", type: :view do
  let(:surveyor) {
    Surveyor.create!(
      user: nil,
      firstname: "MyString",
      lastname: "MyString",
      email: "MyString",
      phone: "MyString",
      street_address: "MyString",
      geocode: "MyString",
      city: "MyString",
      zipcode: "MyString",
      state: "MyString",
      role: "MyString",
      status: "MyString"
    )
  }

  before(:each) do
    assign(:surveyor, surveyor)
  end

  it "renders the edit surveyor form" do
    render

    assert_select "form[action=?][method=?]", surveyor_path(surveyor), "post" do

      assert_select "input[name=?]", "surveyor[user_id]"

      assert_select "input[name=?]", "surveyor[firstname]"

      assert_select "input[name=?]", "surveyor[lastname]"

      assert_select "input[name=?]", "surveyor[email]"

      assert_select "input[name=?]", "surveyor[phone]"

      assert_select "input[name=?]", "surveyor[street_address]"

      assert_select "input[name=?]", "surveyor[geocode]"

      assert_select "input[name=?]", "surveyor[city]"

      assert_select "input[name=?]", "surveyor[zipcode]"

      assert_select "input[name=?]", "surveyor[state]"

      assert_select "input[name=?]", "surveyor[role]"

      assert_select "input[name=?]", "surveyor[status]"
    end
  end
end
