@pantry = current_user.pantry
json.pantry do
  json.id @pantry.id
  json.name @pantry.name

  json.ingredients @pantry.ingredients do |ingredient|
  	json.ingredient do
  	  json.id ingredient.id
  	  json.name ingredient.name

  	  json.pantry_ingredients do
  	  	pantry_ingredient = ingredient.pantry_ingredients.where(ingredient_id: ingredient.id).first
  	  	json.id pantry_ingredient.id
        json.qty pantry_ingredient.qty
  	  end
  	end
  end

  json.url api_v1_pantry_url(@pantry)
end
