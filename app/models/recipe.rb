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
end
