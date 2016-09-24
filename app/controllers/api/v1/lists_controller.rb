class Api::V1::ListsController < ApiController
	before_action :set_list, except: [:index, :create]
  def index
    lists = current_user.lists
  	render json: lists
  end

  def show
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
  	if @list.update(list_params)
  		render :show
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
