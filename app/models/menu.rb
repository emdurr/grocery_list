class Menu < ApplicationRecord
	belongs_to :user
	has_many :menu_recs
	has_many :recipes, :through => :menu_recs
end
