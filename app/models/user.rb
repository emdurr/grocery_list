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

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :menus, dependent: :destroy
  has_many :lists, dependent: :destroy
  has_one :pantry, dependent: :destroy
  has_many :ingredients, :through => :pantry

  after_create do
    Pantry.create({ name: 'Larder', user_id: id })
  end


  def self.from_third_party_auth(provider, auth, first_name, last_name)
  	where(provider: provider, uid: auth[:userID]).first_or_create do |user|
  		user.email = auth[:email]
  		user.first_name = first_name
  		user.last_name = last_name
  		user.password = Devise.friendly_token
  	end
  end

end
