class List < ApplicationRecord
	belongs_to :user
	has_many :list_ings
	has_many :ingredients, :through => :list_ings
end
