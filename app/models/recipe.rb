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
				order(readyInMinutes: :asc)
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
				if plural =~ /.*ies$/
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
			pantry = Pantry.ingredients.all
			select { |i| (i.ingredients - pantry).count <= 3 }
		end
	end
end
