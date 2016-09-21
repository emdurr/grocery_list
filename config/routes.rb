Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: {
        registrations: 'users/registrations'
      }

  get '*unmatched_route', to: 'home#index'
end
