class Api::V1::PantriesController < ApiController
	before_action :set_pantry, except: [:index, :create]
  def index
  end

  def show
  end

  def create
  	pantry = Pantry.new(pantry_params)
    pantry.user_id = current_user.id
  	if pantry.save
  		render json: pantry
  	else
  		render json: { errors: pantry.errors }, status: 401
  	end
  end

  def update
  	if @pantry.update(pantry_params)
  		render :show
  	else
  		render json: { errors: @pantry_errors }, status: 401
  	end
  end

  def destroy
  	@pantry.destroy
  	render json: { message: "Destroyed!!" }
  end

  private
  	def set_pantry
  		@pantry = Pantry.find(params[:id])
  	end

  	def pantry_params
  		params.require(:pantry).permit(:id, :name, :qty, :user_id)
  	end
end
