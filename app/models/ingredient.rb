class Ingredient < ApplicationRecord
	has_one :pantry
	has_one :user, :through => :pantry
	has_many :recipe_ings
	has_many :list_ings
	has_many :recipes, :through => :recipe_ings
	has_many :lists, :through => :list_ings
end
