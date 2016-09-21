# == Schema Information
#
# Table name: recipes
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  directions  :text
#  type        :string
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :recipe do
    name "MyString"
    description "MyText"
    directions "MyText"
    type ""
  end
end
