class Api::V1::PantryIngredientsController < ApiController
	before_action :set_pantry
	def index
		@pantry_ingredients = @pantry.pantry_ingredients.all
		render json: @pantry_ingredients
	end

	def create
		ingredient_name = params[:ingredient][:name].downcase
		@ingredient = Ingredient.where(name: ingredient_name).first_or_initialize do |ingredient|
			ingredient.name = ingredient_name
		end
		qty = params[:pantryIngredients][:qty]
		if @ingredient.save
			if @pantry_ingredient = @pantry.pantry_ingredients.find_by(ingredient_id: @ingredient.id)
				if @pantry_ingredient.qty
				  @pantry_ingredient.update(qty: @pantry_ingredient.qty += qty.to_i)
				else
					@pantry_ingredient.update(qty: qty.to_i)
				end
			else
		    @pantry_ingredient = @pantry.pantry_ingredients.create(ingredient_id: @ingredient.id, qty: qty)
		  end
		  render :show
		else
			render json: {errors: @ingredient.errors}, status: 404
		end
	end

	def destroy
		pantry_ingredient = @pantry.pantry_ingredients.find(params[:id])
		pantry_ingredient.destroy
		render json: { message: "Destroyed!!" }
	end

	private
		def set_pantry
			@pantry = current_user.pantry
		end
end