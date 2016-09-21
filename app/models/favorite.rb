# == Schema Information
#
# Table name: favorites
#
#  id         :integer          not null, primary key
#  recipe_id  :integer
#  comment    :text
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Favorite < ApplicationRecord
	belongs_to :user
end
