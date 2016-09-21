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

FactoryGirl.define do
  factory :list do
    name "MyString"
    description "MyText"
  end
end
