class Api::V1::MenuRecsController < ApiController
	before_action :set_menu_rec, except: [:create, :days_list]
	def create
		menu_rec = MenuRec.new(menu_rec_params)

		if menu_rec.save
			render json: menu_rec
		else
			render json: {errors: menu_rec.errors }, status: 401
		end
	end

	def days_list
		days = MenuRec.generate_menu_days_list(params[:menu_id])
		render json: days
	end

	def update
		if @menu_rec.update(menu_rec_params)
			render :show
		else
			render json: {errors: menu_rec.errors }, status: 401
		end
	end

	def destroy
		@menu_rec.destroy
		render json: { message: 'Menu_rec destroyed!'}
	end

	private

	def menu_rec_params
		params.require(:menu_rec).permit(:day, :menu_id, :recipe_id)
	end

	def set_menu_rec
		@menu_rec = MenuRec.find(params[:id])
	end
end