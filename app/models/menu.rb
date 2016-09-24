# == Schema Information
#
# Table name: menus
#
#  id         :integer          not null, primary key
#  name       :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Menu < ApplicationRecord
	belongs_to :user
	has_many :menu_recs
	has_many :recipes, :through => :menu_recs


	# For MenuRecipeListItem

	def self.recipe_list(menu_recs)
		list = []
		menu_recs.each do |menu_rec|
			recipe = menu_rec.recipe
			list << { id: menu_rec.id, recipe: recipe }
		end
		return list
	end

	# For MenuListItem

	def self.menu_full_list(menu_ob_array)
		full_list = []
		menu_ob_array.each do |menu|
			day_count, recipe_count = menu.count_days_recipes
			full_list << {menu: menu, days: day_count, recipes: recipe_count}
		end
		full_list
	end

	def count_days_recipes
		menu_recs = MenuRec.where(menu_id: self.id)
		recipe_count = menu_recs.count
		day = []
		menu_recs.each do |menu_rec|	
			if !day.include?(menu_rec['day']) && menu_rec['day'] != nil
				day << menu_rec['day']
			end
		end
		day_count = day.count
		return day_count, recipe_count
	end
end
