class Api::V1::RecipesController < ApiController
  before_action :set_recipe, except: [:index, :create, :duplicate]

    def index
      if params[:searchQuery]
        Recipe.find_pantry_id(current_user)
        @recipes = Recipe.distribute_params(params[:searchType], params[:searchQuery], params[:searchSort], params[:view], params[:page])
      else
        @recipes = Recipe.find_favorites(current_user.id)
      end
    end

    def search
      # accepting two params: 'search term', 'field name'
      # return search queries
    end

    def show
      @favorite, @favorite_id = Recipe.is_favorite?(@recipe.id, current_user.id)
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

    def duplicate
      recipe = Recipe.find(params[:recipe_id])
      new_recipe = recipe.dup
      new_recipe.user_id = current_user.id
      new_recipe.title = recipe.title + ' - copy'
      new_recipe.save
      recipe.recipe_ings.each do |recing|
        new_ri = recing.dup
        new_ri.recipe_id = new_recipe.id
        new_ri.save
      end
      recipe.steps.each do |step|
        new_step = step.dup
        new_step.recipe_id = new_recipe.id
        new_step.save
      end

      render json: new_recipe
    end

    def image
      recipe_image = Cloudinary::Uploader.upload(params[:image])
      @recipe.update(image: recipe_image['url'])
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
      params.require(:recipe).permit(:title, :ready_in_minutes, :image, :servings, :credit_text, :vegetarian, :vegan, :cuisines, :dish_types, :very_healthy, :cheap, :user_id)
    end
end
