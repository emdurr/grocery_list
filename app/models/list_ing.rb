# == Schema Information
#
# Table name: list_ings
#
#  id             :integer          not null, primary key
#  specifications :string
#  qty_to_buy     :integer
#  list_id        :integer
#  ingredient_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ListIng < ApplicationRecord
	belongs_to :list
	belongs_to :ingredient
end
