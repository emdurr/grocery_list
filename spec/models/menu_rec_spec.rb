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

require 'rails_helper'

RSpec.describe MenuRec, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
