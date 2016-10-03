class Api::V1::RecipeIngsController < ApiController
	before_action :set_recipe
	def index
		@recipe_ingredients = @recipe.recipe_ings.all
		render json: @recipe_ings
	end

	def create
		ingredient_name = params[:ingredient][:name].downcase
		@ingredient = Ingredient.where(name: ingredient_name).first_or_initialize do |ingredient|
			ingredient.name = ingredient_name
		end
		amount = params[:recipe_ing][:amount]
		unit = params[:recipe_ing][:unit]
		if @ingredient.save
			if @recipe_ingredient = @recipe.recipe_ings.find_by(ingredient_id: @ingredient.id)
				if @recipe_ingredient.amount
				  @recipe_ingredient.update(amount: amount)
				else
					@recipe_ingredient.update(amount: amount)
				end
			else
		    @recipe_ingredient = @recipe.recipe_ings.create(ingredient_id: @ingredient.id, amount: amount, unit: unit )
		  end
		  render :show
		else
			render json: {errors: @ingredient.errors}, status: 404
		end
	end

	def destroy
		recipe_ingredient = @recipe.recipe_ings.find(params[:id])
		recipe_ingredient.destroy
		render json: { message: "Destroyed!!" }
	end

	private
		def set_recipe
			@recipe = Recipe.find(params[:recipe_id])
		end
end