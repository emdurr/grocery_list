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
	belongs_to :user
	has_many :recipe_ings
	has_many :menu_recs
	has_many :menus, :through => :menu_recs
	has_many :ingredients, :through => :recipe_ings
end
