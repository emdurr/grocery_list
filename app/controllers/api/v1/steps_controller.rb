class Api::V1::StepsController < ApiController
	before_action :set_recipe
	def index
	end

	def create
		@step = @recipe.steps.new(step_params)

		if @step.save
        render :show
    else
      render json: { errors: @step.errors }, status: 401
    end
	end

	def destroy
		
	end

	private
		def set_recipe
			@recipe = Recipe.find(params[:recipe_id])
		end

		def step_params
			params.require(:steps).permit(:recipe_id, :number, :step_text)
		end
end