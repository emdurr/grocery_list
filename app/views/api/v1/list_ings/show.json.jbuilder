json.ingredient do
  json.id @ingredient.id
  json.name @ingredient.name

  json.list_ing do
  		json.id @list_ing.id
  		json.qty_to_buy @list_ing.qty_to_buy
  end
end