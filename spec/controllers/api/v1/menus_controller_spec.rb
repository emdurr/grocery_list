require 'rails_helper'

RSpec.describe Api::V1::MenusController, type: :controller do

	describe "GET #index" do
		before(:each) do
			sign_in(@user = FactoryGirl.create(:user_with_menus))
			get :index, user_id: @user.id, fromat: :json
		end

		it "returns http success" do
			expect(response).to have_http_status(:success)
		end

		it "returns menus as json" do
			parsed_response = JSON.parse(response.body)
			expect(parsed_response['menus'].length).to eq(5)
		end
	end
end
