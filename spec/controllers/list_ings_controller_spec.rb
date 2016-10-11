require 'rails_helper'

RSpec.describe Api::V1::ListIngsController, type: :controller do

	describe "GET #index" do
		it "returns http success" do
			current_user = User.create(first_name: 'Sam', last_name: 'Elliot', email: 'sam@elliot.com', password: 'password')
			list = List.create(name: 'Smiths', user_id: current_user.id)
			binding.pry
			get :index, params: { list_id: list.id }
			expect(response).to have_http_status(:success)
		end

		it "sets the @list instance variable" do
			current_user = User.create(first_name: 'Sam', last_name: 'Elliot', email: 'sam@elliot.com', password: 'password')
			list = List.create(name: 'Smiths', user_id: current_user.id)
			get :index, params: { list_id: list.id }
			expect(assigns(:list)).to eq([])
		end
	end
end