# == Schema Information
#
# Table name: list_ings
#
#  id             :integer          not null, primary key
#  specifications :string
#  qty_to_buy     :integer
#  list_id        :integer
#  ingredient_id  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'rails_helper'

RSpec.describe ListIng, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
