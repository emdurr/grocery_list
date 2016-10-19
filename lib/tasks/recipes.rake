def get_analyzed_steps(id)
	method = "/recipes/#{id}/analyzedInstructions"
	uri = Spoonacular.build_endpoint(method, "")
	response = Spoonacular.get({key: ENV['SPOONACULAR_API_KEY'], uri: uri})
	return response
end

namespace :recipes do
	desc "For each dish type, fetch X recipes Y times"
	task fetch: :environment do
		pulled_recipes = 0
	  	recipes_added = 0
	  	ingredients_added = 0
	  	recipe_ings_added = 0
	  	steps_added = 0
	  	recipes_skipped = 0
	  	# Update number of times and 'number' value in search_recipes function to get more or less results.
	  	# Max 'number' is 100
	  	# Max offset is 900, so if 'number' is 100, max times is 10.
	  	# Thus, max number of recipes per task run is 1000
	  	dish_types = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'drink']
	  	dish_types.each do |dish|
			1.times do
			  	api_client = Spoonacular::API.new(ENV['SPOONACULAR_API_KEY'])
			  	results = api_client.search_recipes({'number'=>'1', 'offset'=>"#{pulled_recipes}", 'type'=>"#{dish}" }).body['results']
			  	results.each do |recipe|
			  		begin
				  		full_recipe = api_client.get_recipe_information(recipe['id']).body
				  		recipe_steps = get_analyzed_steps(recipe['id']).body[0]['steps']
				  		r = Recipe.where("lower(title) LIKE ?", full_recipe['title'].strip.downcase).first_or_initialize(title: full_recipe['title'].titleize)
				  	rescue
				  		puts "********************************************RecipeSkipped"
				  		recipes_skipped += 1
				  		next
				  	end
				  	r.title = full_recipe['title'].titleize
				  	r.ready_in_minutes = full_recipe['readyInMinutes']
				  	r.image = full_recipe['image']
				  	r.servings = full_recipe['servings']
				  	r.credit_text = full_recipe['creditText']
				  	r.cuisines = full_recipe['cuisines']
				  	r.vegetarian = full_recipe['vegetarian']
				  	r.vegan = full_recipe['vegan']
				  	unless r.dish_types.include?(dish)
				  		r.dish_types << dish
					end
				  	r.cheap = full_recipe['cheap']
				  	r.very_healthy = full_recipe['veryHealthy']
				  	r.published = true

			  		recipes_added += 1 if r.new_record?
			  		pulled_recipes += 1
			  		r.save

			  		full_recipe['extendedIngredients'].each do |i|
						ingredient = Ingredient.where(name: i['name']).first_or_initialize

						ingredients_added += 1 if ingredient.new_record?
						ingredient.save

						recipe_ing = RecipeIng.where("recipe_id = ? AND ingredient_id = ?",
							r.id, ingredient.id).first_or_initialize(
								recipe_id: r.id, ingredient_id: ingredient.id)
						recipe_ing.unit = i['unit']
						recipe_ing.amount = i['amount']
						recipe_ing.metaInformation = i['metaInformation']

						recipe_ings_added += 1 if recipe_ing.new_record?
						recipe_ing.save
					end

					recipe_steps.each do |s|
						step = Step.where("recipe_id = ? AND number = ? AND step_text = ?",
							r.id, s['number'], s['step']).first_or_initialize(
								recipe_id: r.id,
								number: s['number'],
								step_text: s['step']
						)

						steps_added += 1 if step.new_record?
						step.save
					end
					puts "Recipe #{r.title} added"
			  	end
			end
		end
		puts "Recipe Fetch Complete!"
		puts "Recipes Added: #{recipes_added}"
		puts "Ingredients Added: #{ingredients_added}"
		puts "Recipe Ingredients Added: #{recipe_ings_added}"
		puts "Steps Added: #{steps_added}"
		puts "Recipes Skipped: #{recipes_skipped}"
	end
end
