json.ingredient do
  json.id @ingredient.id
  json.name @ingredient.name

  json.pantry_ingredients do
  		json.id @pantry_ingredient.id
  		json.qty @pantry_ingredient.qty
  end
end