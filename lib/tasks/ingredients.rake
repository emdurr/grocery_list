namespace :ingredients do
	desc "Get sample of ingredients from Ingredients table and add to User.1 Pantry"
	task populate: :environment do
		ingredients_added = 0
		main_ings = Ingredient.where("recipe_ings_count > 5").sample(50)
		addl_ings = Ingredient.where("recipe_ings_count < 5").sample(50)
		ingredients = main_ings + addl_ings
		user_pantry_id  = User.find(1).pantry.id
		ingredients.each do |ing|
			pantry_ingredient = PantryIngredient.where("ingredient_id = ? and pantry_id = ?", ing.id, user_pantry_id).first_or_initialize(
				ingredient_id: ing.id, pantry_id: user_pantry_id)
			pantry_ingredient.qty = [1, 2, 3].sample
			pantry_ingredient.save
		end
	end
end