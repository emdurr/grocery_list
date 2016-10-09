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
	has_many :recipe_ings, dependent: :destroy
	has_many :list_ings, dependent: :destroy
	has_many :pantry_ingredients, dependent: :destroy
	has_many :pantries, :through => :pantry_ingredients
	has_many :recipes, :through => :recipe_ings
	has_many :lists, :through => :list_ings

	
end
