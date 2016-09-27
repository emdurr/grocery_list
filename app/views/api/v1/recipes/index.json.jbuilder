
	json.recipesArray @recipes do |recipe|
		json.id recipe.id
		json.title recipe.title
		json.ingredientCount recipe.recipe_ings.count
		json.readyInMinutes recipe.readyInMinutes
		json.servings recipe.servings
		json.creditText recipe.creditText
		json.imageUrl recipe.image
	end