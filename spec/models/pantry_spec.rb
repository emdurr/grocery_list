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

require 'rails_helper'

RSpec.describe Pantry, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
