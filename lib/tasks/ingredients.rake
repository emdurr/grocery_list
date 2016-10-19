namespace :ingredients do
	desc "Get sample of ingredients from Ingredients table and add to User.1 Pantry"
	task populate: :environment do
		puts "Which user would you like to run this task for? Enter a user id."
		user_id = gets.strip.downcase.to_i
		puts "How many ingredients would you like to add?"
		puts "2/3 will be ingredients featured in more than 5 recipes, 1/3 will be rarer ingredients."
		number_of_ings = gets.strip.downcase.to_i
		ingredients_added = 0
		main_ings = Ingredient.where("recipe_ings_count > 5").sample((number_of_ings * 2 / 3).to_i)
		addl_ings = Ingredient.where("recipe_ings_count < 5").sample((number_of_ings / 3).to_i)
		ingredients = main_ings + addl_ings
		user_pantry_id  = User.find(user_id).pantry.id
		ingredients.each do |ing|
			pantry_ingredient = PantryIngredient.where("ingredient_id = ? and pantry_id = ?", ing.id, user_pantry_id)
			if pantry_ingredient.empty?
				new_ing = PantryIngredient.new(ingredient_id: ing.id, pantry_id: user_pantry_id)
				new_ing.qty = [1, 2, 3].sample
				new_ing.save
			end
		end
	end
end