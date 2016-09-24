json.list do
  json.id @list.id
  json.name @list.name
  json.description @list.description

  json.ingredients @list.ingredients do |ingredient|
  	json.ingredient do
  	  json.id ingredient.id
  	  json.name ingredient.name

  	  json.list_ing do
  	  	list_ing = ingredient.list_ings.where(ingredient_id: ingredient.id).first
  	  	json.id list_ing.id
  		  json.qty_to_buy list_ing.qty_to_buy
  	  end
  	end
  end

  json.url api_v1_list_url(@list)
end
