class Api::V1::IngredientsController < ApiController
	def index
  	if ingredient_query = params[:ingredient]
  	  @ingredients = Ingredient.where(name: ingredient_query[:name])
 		else
    	@ingredients = Ingredient.all
  	end
  	render json: @ingredients
	end

	private
		def ingredient_params
			params.require(:ingredient).permit(:name)
		end
end