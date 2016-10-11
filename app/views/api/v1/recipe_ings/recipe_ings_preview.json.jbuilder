json.recipe_id @recipe.id

json.ingredients @recipe_ings.each do |rec_ing|
	ing = rec_ing.ingredient
	json.name ing.name
	json.id ing.id
	json.amount rec_ing.amount
	json.unit rec_ing.unit

	stock = @pantry.pantry_ingredients.where(ingredient_id: ing.id)
	json.inStock stock.any?

	if stock.any?
		json.pantryIngredientId stock[0].id
	end
	
end
