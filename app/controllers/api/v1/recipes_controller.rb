class Api::V1::RecipesController < ApiController
  before_action :set_recipe, except: [:index, :create]

    def index
      if params[:searchType] && params[:searchQuery]
        @recipes = Recipe.decipher_search_params(params[:searchType], params[:searchQuery])
      else
        @recipes = Recipe.all
      end
    end

    def search
      # accepting two params: 'search term', 'field name'
      # return search queries
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
      params.require(:recipe).permit(:title, :ready_in_minutes, :image, :servings, :credit_text, :user_id)
    end
end
