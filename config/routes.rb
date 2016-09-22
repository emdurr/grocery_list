# == Route Map
#
#                   Prefix Verb   URI Pattern                    Controller#Action
#                     root GET    /                              home#index
#         new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
#             user_session POST   /users/sign_in(.:format)       devise/sessions#create
#     destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy
#            user_password POST   /users/password(.:format)      devise/passwords#create
#        new_user_password GET    /users/password/new(.:format)  devise/passwords#new
#       edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
#                          PATCH  /users/password(.:format)      devise/passwords#update
#                          PUT    /users/password(.:format)      devise/passwords#update
# cancel_user_registration GET    /users/cancel(.:format)        users/registrations#cancel
#        user_registration POST   /users(.:format)               users/registrations#create
#    new_user_registration GET    /users/sign_up(.:format)       users/registrations#new
#   edit_user_registration GET    /users/edit(.:format)          users/registrations#edit
#                          PATCH  /users(.:format)               users/registrations#update
#                          PUT    /users(.:format)               users/registrations#update
#                          DELETE /users(.:format)               users/registrations#destroy
#               list_index GET    /list(.:format)                list#index
#                          POST   /list(.:format)                list#create
#                 new_list GET    /list/new(.:format)            list#new
#                edit_list GET    /list/:id/edit(.:format)       list#edit
#                     list GET    /list/:id(.:format)            list#show
#                          PATCH  /list/:id(.:format)            list#update
#                          PUT    /list/:id(.:format)            list#update
#                          DELETE /list/:id(.:format)            list#destroy
#                          GET    /*unmatched_route(.:format)    home#index
#

Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
        registrations: 'users/registrations',
        sessions: 'users/sessions'
      }

  namespace :api do
		namespace :v1 do
  		resources :lists
  	end
  end

  get '*unmatched_route', to: 'home#index'
end
