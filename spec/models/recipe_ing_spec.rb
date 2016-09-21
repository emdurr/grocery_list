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

require 'rails_helper'

RSpec.describe RecipeIng, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
