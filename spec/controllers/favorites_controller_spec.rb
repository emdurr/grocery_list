require 'rails_helper'

RSpec.describe Api::V1::FavoritesController, type: :controller do
  login_user

  describe "POST #create" do
    it "succesfully creates a favorite" do
      favorite_params = {favorite: {comment: 'test', recipe_id: '34', user_id: controller.current_user.id}}
      post :create, favorite_params
      expect(Favorite.count).to eq(1)
      expect(Favorite.first.comment).to eq(favorite_params[:favorite][:comment])
    end

    it "successfully renders JSON" do
      user = create(:user, controller.current_user.id)
      favorite_params = {favorite: {comment: 'test', recipe_id: '34', user_id: current_user.id}}
      favorite=FactoryGirl.create(:favorite)
      render :json => {:success => true}
      favorites_controller.rb
      parse_json = JSON(response.body)
      parse_json["success"].should == true
    end
  end


  describe "DELETE #destroy" do
    it "succesfully deletes a favorite" do
      favorite = Favorite.create(comment: 'test', recipe_id: '34', user_id: controller.current_user.id)
      expect(Favorite.count).to eq(1)
      delete :destroy, id: favorite.id
      expect(Favorite.count).to eq(0)
    end
  end
end
