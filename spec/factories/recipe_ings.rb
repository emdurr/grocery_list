# == Schema Information
#
# Table name: recipe_ings
#
#  id             :integer          not null, primary key
#  specifications :string
#  prep           :string
#  ingredient_id  :integer
#  recipe_id      :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryGirl.define do
  factory :recipe_ing do
    specifications "MyString"
    prep "MyString"
  end
end
