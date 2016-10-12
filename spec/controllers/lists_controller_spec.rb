require 'rails_helper'

RSpec.describe Api::V1::ListsController, type: :controller do
  login_user

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'sets the lists instance variable' do
      get :index
      expect(assigns(:lists)).to eq([])
    end

    it 'has lists in the instance variable' do
      List.create(name: 'test', user_id: controller.current_user.id)
      get :index 
      expect(assigns(:lists).length).to eq(1)
      expect(assigns(:lists).first.name).to eq('test')
    end

    it 'renders the index template' do
      get :index
      expect(response.content_type).to eq("application/json") 
    end
  end

  describe "GET #show" do
    it "returns http success" do
      list = List.create(name: 'test', user_id: controller.current_user.id)
      get :show, id: list.id
      expect(response).to have_http_status(:success)
    end

    it 'sets the list instance variable' do
      list = List.create(name: 'test', user_id: controller.current_user.id)
      get :show, id: list.id
      expect(assigns(:list)).to eq([])
    end

    it "renders the show template" do
      list = List.create(name: 'test', user_id: controller.current_user.id)
      get :show, id: list.id
      expect(response.content_type).to eq("application/json")
    end
  end

  describe "POST #create" do
    it "successfully creates a list" do
      list_params = {list: {name: 'test', user_id: controller.current_user.id}}
      post :create, list_params
      expect(List.count).to eq(1)
      expect(List.first.name).to eq(list_params[:list][:name])
    end

    it "renders the new template on unsuccessful create" do
      list_params = {list: {population: '100', language: 'English'}}
      post :create, list_params
      expect(List.count).to eq(0)
      expect(response).to render_template(:new)
    end

    it "redirects to the list path upon success" do
      list_params = {list: {name: 'test'}}
      post :create, list_params
      expect(response).to redirect_to list_path(List.first)
    end
  end

end
