json.ingredient do
  json.id @ingredient.id
  json.name @ingredient.name

  json.recipe_ingredients do
  		json.id @recipe_ingredient.id
  		json.amount @recipe_ingredient.amount
  		json.unit @recipe_ingredient.unit
  end
end