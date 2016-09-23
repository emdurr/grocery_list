json.list do
  json.id @list.id
  json.name @list.name
  json.description @list.description

  json.ingredients @list.ingredients do |ingredient|
  	json.id ingredient.id
  	json.name ingredient.name
  end

  json.url api_v1_list_url(@list)
end