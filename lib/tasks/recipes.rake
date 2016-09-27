namespace :recipes do
	desc "Fetch the first 10 recipes from spoonacular api"
	task fetch: :environment do
		pulled_recipes = 0
	  	recipes_added = 0
	  	ingredients_added = 0
	  	recipe_ings_added = 0
		10.times do
		  	api_client = Spoonacular::API.new(ENV['SPOONACULAR_API_KEY'])
		  	results = api_client.search_recipes({'number'=>'10', 'offset'=>"#{pulled_recipes}" }).body['results']
		  	results.each do |recipe|
		  		# Set the recipe attributes
		  		full_recipe = api_client.get_recipe_information(recipe['id']).body
		  		r = Recipe.where(title: full_recipe['title']).first_or_initialize
		  		full_recipe.each do |key, value|
		  			begin
		  				# r.send could cause no method error if recipe
		  				# doesn't have the key as an attribute
		  				next if key == 'id'
		  				r.send("#{key}=", value)
		  			rescue
		  				puts "Error adding #{key}....continuing"
		  			end
		  		end
		  		recipes_added += 1 if r.new_record?
		  		pulled_recipes += 1
		  		r.save
		  		full_recipe['extendedIngredients'].each do |i|
					ingredient = Ingredient.where(name: i['name']).first_or_initialize
					recipe_ing = RecipeIng.where(recipe_id: r.id, ingredient_id: ingredient.id).first_or_initialize
					recipe_ing.unit = i['unit']
					recipe_ing.amount = i['amount']
					recipe_ing.metaInformation = i['metaInformation']

					ingredients_added += 1 if ingredient.new_record?
					recipe_ings_added += 1 if recipe_ing.new_record?
					ingredient.save
					recipe_ing.save
				end
		  	end
		end
		puts "Recipe Fetch Complete!"
		puts "Recipes Added: #{recipes_added}"
		puts "Ingredients Added: #{ingredients_added}"
		puts "Recipe Ingredients Added: #{recipe_ings_added}"
	end
end
