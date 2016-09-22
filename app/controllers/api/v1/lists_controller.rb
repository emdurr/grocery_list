class Api::V1::ListsController < ApplicationController
	before_action :set_list, except: [:index, :create]
  def index
    lists = List.all
  	render json: lists
  end

  def show
  	render json: @list
  end

  def create
  	list = List.new(list_params)
    list.user_id = current_user.id
  	if list.save
  		render json: list
  	else
  		render json: { errors: list.errors }, status: 401
  	end
  end

  def update
  	if @list.update
  		render json: @list
  	else
  		render json: { errors: @list_errors }, status: 401
  	end
  end

  def destroy
  	@list.destroy
  	render json: { message: "Destroyed!!" }
  end

  private
  	def set_list
  		@list = List.find(params[:id])
  	end

  	def list_params
  		params.require(:list).permit(:id, :name, :description, :user_id)
  	end
end
