json.recipeHeaderInfo do
	json.id @recipe.id
	json.title @recipe.title
	json.ingredientCount @recipe.recipe_ings.count
	json.ready_in_minutes @recipe.ready_in_minutes
	json.servings @recipe.servings
	json.credit_text @recipe.credit_text
	json.imageUrl @recipe.image
	json.user @recipe.user_id
end

recipe_ings = @recipe.recipe_ings.sort_by { |x| x['id']}

json.recipeIngredients recipe_ings do |recipe_ing|
	ingredient = recipe_ing.ingredient
	json.id recipe_ing.id
	json.name ingredient.name
	json.amount recipe_ing.amount
	json.unit recipe_ing.unit
	json.metaInformation recipe_ing.metaInformation
end

steps = @recipe.steps.sort_by { |x| x['number']}

json.recipeSteps steps do |step|
	json.number step.number
	json.stepText step.step_text
	json.id step.id
end

json.favoriteInfo do
	json.favorite @favorite
	json.favoriteId @favorite_id
	json.favoriteComment @favorite_comment
end
