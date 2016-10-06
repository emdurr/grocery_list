# == Schema Information
#
# Table name: recipes
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  directions  :text
#  type        :string
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Recipe < ApplicationRecord
	has_many :recipe_ings, dependent: :destroy
	has_many :menu_recs, dependent: :destroy
	has_many :menus, :through => :menu_recs
	has_many :ingredients, :through => :recipe_ings
	has_many :steps, dependent: :destroy


	class << self

		# SEARCH FUNCTIONALITY

		def distribute_params(search_type, search_query, search_sort)
			results = set_type(search_type, search_query)
			 sorted_results = results.set_filter(search_sort)
			 sorted_results.uniq
		end


		def set_type(search_type, search_query)
			case search_type
			when 'title'
				title_search(ready_search(search_query))
			when 'ingredients'
				ingredient_search(ready_search(search_query))
			else
				all_search(ready_search(search_query))
			end
		end

		def set_filter(search_sort)
			case search_sort
			when 'alphabetical'
				order(title: :asc)
			when 'fewest ingredients'
				order(recipe_ings_count: :asc)
			when 'in my pantry'
				apply_pantry_filter
			when 'shortest preptime'
				order(ready_in_minutes: :asc)
			else
				order(title: :asc)
			end
		end

		def ready_search(query)
			search_array = []
			query.split(' ').each do |word|
				word = word.strip.downcase
				singular = word.singularize
				plural = word.pluralize
				if singular.length <= 2
					search_array << "#{word}"
				elsif plural =~ /.*ies$/ && singular =~ /.*y$/
					search_array << "%#{plural.split('ies')[0]}%"
				else
					search_array << "%#{singular}%"
				end
			end
			search_array
		end

		def all_search(query_array)
			where_statement = Recipe.joins(:ingredients)
			query_array.each do |word|
				where_statement = where_statement.where("lower(name) LIKE ? OR lower(title) LIKE ?",
				word, word)
			end
			where_statement
		end

		def ingredient_search(query_array)
			where_statement = Recipe.joins(:ingredients)
			query_array.each do |word|
				where_statement = where_statement.where("lower(ingredients.name) LIKE ?", word)
			end
			where_statement
		end

		def title_search(query_array)
			where_statement = Recipe
			query_array.each do |word|
				where_statement = where_statement.where("lower(title) LIKE ?", word)
			end
			where_statement
		end

		def apply_pantry_filter
			# needs to use only user's pantry
			pantry = Pantry.find(current_user.id).ingredients.ids
			Recipe.all.select { |i| (i.ingredients.id - pantry).count <= 3 }
		end

		def pantry_filter_2
			pantry = current_user.pantry.ingredients
			recipes = Recipe.all
			matches = []
			recipes.each do |recipe|
				length = recipe.ingredients.length
				not_found = 0
				ingredients = recipe.ingredients 
				i = 0
				while not_found < 3
					if i >= (recipe.length - 1)
						matches << recipe
						break
					end
					if pantry.include?(ingredients[i])
						nil
					else
						not_found += 1
					end
					i += 1
				end
			end
			matches
		end

		# FAVORITES FUNCTIONS

		def find_favorites(user_id)
			favorites = Favorite.where(user_id: user_id)
			recipes = []
			favorites.each do |fav|
				recipes << Recipe.find(fav.recipe_id)
			end
			recipes.uniq
		end

		def is_favorite?(recipe_id, user_id)
			favorite = Favorite.where(user_id: user_id).where(recipe_id: recipe_id)
			if favorite.any?
				return true, favorite[0].id, favorite[0].comment
			else
				return false, nil
			end
		end
	end
end
