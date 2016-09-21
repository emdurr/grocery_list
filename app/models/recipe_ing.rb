# == Schema Information
#
# Table name: recipe_ings
#
#  id             :integer          not null, primary key
#  specifications :string
#  prep           :string
#  ingredient_id  :integer
#  recipe_id      :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class RecipeIng < ApplicationRecord
	belongs_to :recipe
	belongs_to :ingredient
end
