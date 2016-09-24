json.menu do
	json.id @menu.id 
	json.name @menu.name

	json.recipes @menu.menu_recs do |menu_rec|
		recipe = menu_rec.recipe
		json.ingredients_count recipe.ingredients.count
		json.name recipe.name
		json.day menu_rec.day
		json.menu_rec_id menu_rec.id
		json.recipe_id recipe.id
	end
end