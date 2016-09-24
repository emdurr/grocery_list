class Api::V1::ListIngsController < ApiController
	before_action :set_list
	def index
		@list_ings = @list.list_ings.all
		render json: @list_ings
	end

	def create
		ingredient_name = params[:ingredient][:name].downcase
		qty_to_buy = params[:list_ing][:qty_to_buy]
		@ingredient = Ingredient.where(name: ingredient_name).first_or_initialize do |ingredient|
			ingredient.name = ingredient_name
		end
		if @ingredient.save
			if @list_ing = @list.list_ings.find_by(ingredient_id: @ingredient.id)
				if @list_ing.qty_to_buy
				  @list_ing.update(qty_to_buy: @list_ing.qty_to_buy += qty_to_buy.to_i)
				else
					@list_ing.update(qty_to_buy: qty_to_buy.to_i)
				end
			else
		    @list_ing = @list.list_ings.create(ingredient_id: @ingredient.id, qty_to_buy: qty_to_buy)
		  end
		  render :show
		else
			render json: {errors: @ingredient.errors}, status: 404
		end
	end

	def destroy
		list_ing = @list.list_ings.find(params[:id])
		list_ing.destroy
		render json: { message: "Destroyed!!" }
	end

	private
		def set_list
			@list = current_user.lists.find(params[:list_id])
		end
end