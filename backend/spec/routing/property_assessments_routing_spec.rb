require "rails_helper"

RSpec.describe PropertyAssessmentsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/property_assessments").to route_to("property_assessments#index")
    end

    it "routes to #new" do
      expect(get: "/property_assessments/new").to route_to("property_assessments#new")
    end

    it "routes to #show" do
      expect(get: "/property_assessments/1").to route_to("property_assessments#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/property_assessments/1/edit").to route_to("property_assessments#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/property_assessments").to route_to("property_assessments#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/property_assessments/1").to route_to("property_assessments#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/property_assessments/1").to route_to("property_assessments#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/property_assessments/1").to route_to("property_assessments#destroy", id: "1")
    end
  end
end
