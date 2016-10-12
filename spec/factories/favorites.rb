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

FactoryGirl.define do

  factory :favorite do
    recipe_id 1
    comment "This is tasty"
    
  end
end
