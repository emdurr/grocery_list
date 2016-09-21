class Recipe < ApplicationRecord
	belongs_to :user
	has_many :recipe_ings
	has_many :menu_recs
	has_many :menus, :through => :menu_recs
	has_many :ingredients, :through => :recipe_ings
end
