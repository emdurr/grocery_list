# == Schema Information
#
# Table name: menu_recs
#
#  id         :integer          not null, primary key
#  day        :string
#  recipe_id  :integer
#  menu_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MenuRec < ApplicationRecord
	belongs_to :recipe
	belongs_to :menu

	def self.generate_menu_days_list(menu_id)
		menu_days_list = []
		menu_recs = MenuRec.where(menu_id: menu_id)
		menu_recs.each do |mr|
			unless menu_days_list.include?(mr.day)
				menu_days_list << mr.day
			end
		end
		menu_days_list
	end
end
