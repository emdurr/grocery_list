class Api::V1::RecipesController < ApiController
  before_action :set_recipe, except: [:index, :create]

    def index
      @recipes = Recipe.where(id: [1,2,3,4,5])
    end

    def show
    end

    def create
      recipe = Recipe.new(recipe_params)
      recipe.user_id = current_user.id
      if recipe.save
        render json: recipe
      else
        render json: { errors: recipe.errors }, status: 401
      end
    end

    def update
      if @recipe.update
        render json: @recipe
      else
        render json: { errors: @recipe_errors }, status: 401
      end
    end

    def destroy
      @recipe.destroy
      render json: { message: "Destroyed!"}
    end

    private

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipe_params
      params.require(:recipe).permit(:name, :description, :directions, :type, :user_id)
    end
end
