# == Route Map
#
#                   Prefix Verb   URI Pattern                       Controller#Action
#                     root GET    /                                 home#index
#         new_user_session GET    /users/sign_in(.:format)          sessions#new
#             user_session POST   /users/sign_in(.:format)          sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)         sessions#destroy
#            user_password POST   /users/password(.:format)         devise/passwords#create
#        new_user_password GET    /users/password/new(.:format)     devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format)    devise/passwords#edit
#                          PATCH  /users/password(.:format)         devise/passwords#update
#                          PUT    /users/password(.:format)         devise/passwords#update
# cancel_user_registration GET    /users/cancel(.:format)           registrations#cancel
#        user_registration POST   /users(.:format)                  registrations#create
#    new_user_registration GET    /users/sign_up(.:format)          registrations#new
#   edit_user_registration GET    /users/edit(.:format)             registrations#edit
#                          PATCH  /users(.:format)                  registrations#update
#                          PUT    /users(.:format)                  registrations#update
#                          DELETE /users(.:format)                  registrations#destroy
#             api_v1_lists GET    /api/v1/lists(.:format)           api/v1/lists#index
#                          POST   /api/v1/lists(.:format)           api/v1/lists#create
#              api_v1_list GET    /api/v1/lists/:id(.:format)       api/v1/lists#show
#                          PATCH  /api/v1/lists/:id(.:format)       api/v1/lists#update
#                          PUT    /api/v1/lists/:id(.:format)       api/v1/lists#update
#                          DELETE /api/v1/lists/:id(.:format)       api/v1/lists#destroy
#             api_v1_menus GET    /api/v1/menus(.:format)           api/v1/menus#index
#                          POST   /api/v1/menus(.:format)           api/v1/menus#create
#              api_v1_menu GET    /api/v1/menus/:id(.:format)       api/v1/menus#show
#                          PATCH  /api/v1/menus/:id(.:format)       api/v1/menus#update
#                          PUT    /api/v1/menus/:id(.:format)       api/v1/menus#update
#                          DELETE /api/v1/menus/:id(.:format)       api/v1/menus#destroy
#           api_v1_recipes GET    /api/v1/recipes(.:format)         api/v1/recipes#index
#                          POST   /api/v1/recipes(.:format)         api/v1/recipes#create
#            api_v1_recipe GET    /api/v1/recipes/:id(.:format)     api/v1/recipes#show
#                          PATCH  /api/v1/recipes/:id(.:format)     api/v1/recipes#update
#                          PUT    /api/v1/recipes/:id(.:format)     api/v1/recipes#update
#                          DELETE /api/v1/recipes/:id(.:format)     api/v1/recipes#destroy
#       api_v1_ingredients GET    /api/v1/ingredients(.:format)     api/v1/ingredients#index
#                          POST   /api/v1/ingredients(.:format)     api/v1/ingredients#create
#        api_v1_ingredient GET    /api/v1/ingredients/:id(.:format) api/v1/ingredients#show
#                          PATCH  /api/v1/ingredients/:id(.:format) api/v1/ingredients#update
#                          PUT    /api/v1/ingredients/:id(.:format) api/v1/ingredients#update
#                          DELETE /api/v1/ingredients/:id(.:format) api/v1/ingredients#destroy
#      api_v1_pantry_index POST   /api/v1/pantry(.:format)          api/v1/pantry#create
#            api_v1_pantry PATCH  /api/v1/pantry/:id(.:format)      api/v1/pantry#update
#                          PUT    /api/v1/pantry/:id(.:format)      api/v1/pantry#update
#                          DELETE /api/v1/pantry/:id(.:format)      api/v1/pantry#destroy
#       api_v1_recipe_ings POST   /api/v1/recipe_ings(.:format)     api/v1/recipe_ings#create
#        api_v1_recipe_ing PATCH  /api/v1/recipe_ings/:id(.:format) api/v1/recipe_ings#update
#                          PUT    /api/v1/recipe_ings/:id(.:format) api/v1/recipe_ings#update
#                          DELETE /api/v1/recipe_ings/:id(.:format) api/v1/recipe_ings#destroy
#         api_v1_menu_recs POST   /api/v1/menu_recs(.:format)       api/v1/menu_recs#create
#          api_v1_menu_rec PATCH  /api/v1/menu_recs/:id(.:format)   api/v1/menu_recs#update
#                          PUT    /api/v1/menu_recs/:id(.:format)   api/v1/menu_recs#update
#                          DELETE /api/v1/menu_recs/:id(.:format)   api/v1/menu_recs#destroy
#         api_v1_list_ings POST   /api/v1/list_ings(.:format)       api/v1/list_ings#create
#          api_v1_list_ing PATCH  /api/v1/list_ings/:id(.:format)   api/v1/list_ings#update
#                          PUT    /api/v1/list_ings/:id(.:format)   api/v1/list_ings#update
#                          DELETE /api/v1/list_ings/:id(.:format)   api/v1/list_ings#destroy
#                          GET    /*unmatched_route(.:format)       home#index
#

Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: {
        registrations: 'registrations',
        sessions: 'sessions'
      }
  post 'facebook_login', to: 'third_party_auth#facebook'
# handle adding user ID in controller
  namespace :api do
		namespace :v1 do
  		resources :lists, except: [:new, :edit]
      get '/menus/simple_list', to: 'menus#simple_list'
      resources :menus, except: [:new, :edit]
      resources :recipes, except: [:new, :edit]
      get '/recipes/search', to: 'recipes#search'
      post '/recipes/:id/image', to: 'recipes#image'
      get '/recipes/:id/ingredients', to: 'recipes#ingredients_list'
      resources :ingredients, except: [:new, :edit]
      resources :pantries, except: [:new, :edit]
      resources :recipe_ings, only: [:create, :update, :destroy]
      get 'menu_recs/days_list', to: 'menu_recs#days_list'
      resources :menu_recs, only: [:create, :update, :destroy]
      resources :list_ings
      resources :pantry_ingredients, only: [:create, :update, :destroy]
      resources :steps, only: [:create, :update, :destroy]
      resources :favorites, except: [:new, :edit, :show]
      post '/recipes/duplicate', to: 'recipes#duplicate'
  	end
  end

  get '/recipes/search', to: 'recipes#search'

  get '*unmatched_route', to: 'home#index'
end
