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
end
