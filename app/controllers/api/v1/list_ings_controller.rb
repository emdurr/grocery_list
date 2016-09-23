class Api::V1::List_ingsController < ApplicationController
	before_action :set_list
	def index
		@list_ings = @list.list_ings.all
		render json: @list_ings
	end

	def create
		list_ing = @list.list_ing.new(list_ing_params)
		if list_ing.save
			render json: list_ing
		else
			render json: { errors: list_ing.errors }, status: 401
  	end
	end

	def destroy
		list_ing = @list.list_ing.find(params[:id])
		list_ing.destroy
		render json: { message: "Destroyed!!" }
	end
	
	private
		def set_list
			@list = List.find(params[:id])
		end

		def list_ing_params
			params.require(:list_ing).permit(:ingredient_id, :list_id)
		end
end