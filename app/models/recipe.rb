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

		def decipher_search_params(search_type, search_query)
			case search_type
			when 'title'
				run_title_search(search_query)
			when 'ingredients'
				run_ingredients_search(search_query)
			else
				run_title_search(search_query)
			end
		end

		def ready_search_string(query)
			"%#{query.strip.downcase}%"
		end

		def run_title_search(query)
			phrase_match_results = Recipe.where("lower(title) LIKE ?", ready_search_string(query))
		end

		def run_ingredients_search(query)
			phrase_match_results = Recipe.joins(:ingredients).where("lower(ingredients.name) LIKE ?", ready_search_string(query))
		end
	end
end
