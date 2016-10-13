# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#

FactoryGirl.define do
  factory :user do
  	first_name { Faker::Name.first_name }
  	last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password "password"
    password_confirmation "password"

	  factory :user_with_menus do
	    # menus_count is declared as a transient attribute and available in
	    # attributes on the factory, as well as the callback via the evaluator
	    transient do
	      menus_count 5
	    end

	    # # the after(:create) yields two values; the user instance itself and the
	    # # evaluator, which stores all values from the factory, including transient
	    # # attributes; `create_list`'s second argument is the number of records
	    # # to create and we make sure the user is associated properly to the menu
	    after(:create) do |user, evaluator|
	      create_list(:menu, evaluator.menus_count, user: user)
	    end
    end

  end
end
