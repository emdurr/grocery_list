json.ingredientsBundle @recipe.recipe_ings.each do |rec_ing|

	# Ingredient Info
	ing = rec_ing.ingredient

	json.description "#{rec_ing.amount} #{rec_ing.unit} #{ing.name }"
	json.ingredientId ing.id
	json.ingredientName ing.name

	#Pantry Info
	item_in_pantry = @user.pantry.pantry_ingredients.where(ingredient_id: ing.id)
	in_stock = item_in_pantry.any?
	qty_in_stock = item_in_pantry[0].qty if in_stock

	json.inStock in_stock
	json.qtyInStock qty_in_stock
end

json.listOptions @user.lists.each do |list|
	json.listName list.name
	json.listId list.id
end