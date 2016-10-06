class Api::V1::FavoritesController < ApiController

  def create
    favorite = Favorite.new(favorite_params)
    favorite.user_id = current_user.id
    if favorite.save
      render json: favorite
    else
      render json: {errors: favorite.errors }, status: 401
    end
  end

  def destroy
    Favorite.find(params[:id]).destroy
    render json: {message: 'Favorite Destroyed'}
  end


 private

 def favorite_params
   params.require(:favorite).permit(:comment, :recipe_id, :user_id)
 end
end
