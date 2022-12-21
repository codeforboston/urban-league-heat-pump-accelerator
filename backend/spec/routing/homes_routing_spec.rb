require "rails_helper"

RSpec.describe HomesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/homes").to route_to("homes#index")
    end

    it "routes to #new" do
      expect(get: "/homes/new").to route_to("homes#new")
    end

    it "routes to #show" do
      expect(get: "/homes/1").to route_to("homes#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/homes/1/edit").to route_to("homes#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/homes").to route_to("homes#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/homes/1").to route_to("homes#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/homes/1").to route_to("homes#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/homes/1").to route_to("homes#destroy", id: "1")
    end
  end
end
