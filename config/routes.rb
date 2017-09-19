Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    # auth
    resources :users, only: :create
    resource :session, only: [:create, :destroy]

    # channels
    resources :channels, except: [:new, :edit, :index]
    resources :users, only: [] do
      resources :channels, only: :index
    end
  end

  root to: 'static_pages#root'
end
