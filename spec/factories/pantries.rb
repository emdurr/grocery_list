# == Schema Information
#
# Table name: pantries
#
#  id             :integer          not null, primary key
#  qty            :integer
#  specifications :string
#  ingredient_id  :integer
#  user_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryGirl.define do
  factory :pantry do
    qty "MyString"
    specifications "MyString"
  end
end
