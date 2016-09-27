class ThirdPartyAuthController < ApplicationController
	skip_before_action :verify_authentication_token

	def facebook
		auth = params[:auth]
		first_name = params[:firstName]
		last_name = params[:lastName]
		@user = User.from_third_party_auth('facebook', params[:auth, :first_name, :last_name])

		if @user.persisted?
			sign_in(@user, event: :authentication)
			render json: @user
		else
			render json: { errors: params[:auth] }, status: 401
		end
	end
end
