require 'rails_helper'

RSpec.describe Api::V1::FavoritesController, type: :controller do

  describe "POST #create" do
    it "succesfully creates a favorite" do
      favorite_params = {favorite: {comment: 'test', recipe_id: '34', user_id: '2'}}
      post :create, favorite_params
      expect(Favorite.count).to eq(1)
      expect(Favorite.first.comment).to eq(favorite_params[:favorite][:comment])
    end

    it "successfully renders JSON" do
      render :json => {:success => true, :data => data}
      favorites_controller.rb
      parse_json = JSON(response.body)
      parse_json["success"].should == true
    end
  end


  describe "DELETE #destroy" do
    it "succesfully deletes a favorite" do
      favorite = Favorite.create(comment: 'test', recipe_id: '34', user_id: '2')
      expect(Favorite.count).to eq(1)
      delete :destroy, id: favorite.id
      expect(Favorite.count).to eq(0)
    end
  end
end
