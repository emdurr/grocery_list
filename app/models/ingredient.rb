# == Schema Information
#
# Table name: ingredients
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Ingredient < ApplicationRecord
	has_one :pantry, :through => :pantry_ingredients
	has_one :user, :through => :pantry
	has_many :recipe_ings
	has_many :list_ings
	has_many :pantry_ingredients
	has_many :recipes, :through => :recipe_ings
	has_many :lists, :through => :list_ings
end
