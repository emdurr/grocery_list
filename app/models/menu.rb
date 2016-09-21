# == Schema Information
#
# Table name: menus
#
#  id         :integer          not null, primary key
#  name       :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Menu < ApplicationRecord
	belongs_to :user
	has_many :menu_recs
	has_many :recipes, :through => :menu_recs
end
