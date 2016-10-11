require 'rails_helper'

RSpec.describe Api::V1::ListsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      current_user = User.create(first_name: 'Sam', last_name: 'Elliot', email: 'sam@elliot.com', password: 'password')
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

end
