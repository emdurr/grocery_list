json.ingredient do
  json.id @ingredient.id
  json.name @ingredient.name

  json.pantry_ingredient do
  		json.id @pantry_ingredient.id
  		json.qty @pantry_ingredient.qty
  end
end