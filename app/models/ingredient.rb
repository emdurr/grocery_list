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
	has_many :pantries, dependent: :destroy
	has_many :users, :through => :pantries
	has_many :recipe_ings, dependent: :destroy
	has_many :list_ings, dependent: :destroy
	has_many :recipes, :through => :recipe_ings
	has_many :lists, :through => :list_ings
end
