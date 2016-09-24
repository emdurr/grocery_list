# == Schema Information
#
# Table name: lists
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class List < ApplicationRecord
	belongs_to :user
	has_many :list_ings, dependent: :destroy
	has_many :ingredients, :through => :list_ings

end
