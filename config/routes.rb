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
#                          GET    /*unmatched_route(.:format)    home#index
#

Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
        registrations: 'users/registrations'
      }

  get '*unmatched_route', to: 'home#index'
end
