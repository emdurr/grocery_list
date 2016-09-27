json.recipe_info do 
		recipe = @menu_rec.recipe
		json.ingredients_count recipe.ingredients.count
		json.name recipe.title
		json.day @menu_rec.day
		json.menu_rec_id @menu_rec.id
		json.recipe_id recipe.id
end