class Api::V1::MenusController < ApiController
	before_action :set_menu, except: [:index, :create]

	def index
		menu_list = Menu.where(user_id: current_user.id)
		menu_array = Menu.menu_full_list(menu_list)
		render json: menu_array
	end

	def show
		# menu_recs = MenuRec.where(menu_id: params[:id])
		# recipes_list = Menu.recipe_list(menu_recs)
		# render json: {menu: @menu, recipes: recipes_list}
	end

	def create
		menu = Menu.new(menu_params)
		menu.user_id = current_user.id
		if menu.save
			render json: menu
		else
			render json: { errors: menu.errors }, status: 401
		end
	end

	def update
		if @menu.update(menu_params)
			render json: @menu
		else
			render json: { errors: menu.errors }, status: 401
		end
	end

	def destroy
		@menu.destroy
		render json: {message: 'Menu Destroyed'}
	end

	private

	def set_menu
		@menu = Menu.find(params[:id])
	end

	def menu_params
		params.require(:menu).permit(:name)
	end

end