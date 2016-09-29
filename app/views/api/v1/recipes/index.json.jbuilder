
	json.recipesArray @recipes do |recipe|
		json.id recipe.id
		json.title recipe.title
		json.ingredientCount recipe.recipe_ings.count
		json.ready_in_minutes recipe.ready_in_minutes
		json.servings recipe.servings
		json.credit_text recipe.credit_text
		json.imageUrl recipe.image
	end