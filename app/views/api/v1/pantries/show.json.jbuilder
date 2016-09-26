json.pantry do
  json.id @pantry.id
  json.name @pantry.name
  json.qty @pantry.qty

  json.ingredients @list.ingredients do |ingredient|
  	json.ingredient do
  	  json.id ingredient.id
  	  json.name ingredient.name

  	  json.pantry_ing do
  	  	pantry_ing = ingredient.pantries.where(ingredient_id: ingredient.id).first
  	  	json.id pantry_ing.id
  	  end
  	end
  end

  json.url api_v1_pantry_url(@pantry)
end
