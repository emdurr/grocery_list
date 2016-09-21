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

FactoryGirl.define do
  factory :menu_rec do
    recipe_id "MyString"
    day "MyString"
  end
end
