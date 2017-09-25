Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    # auth
    resources :users, only: :create
    resource :session, only: [:create, :destroy]

    # ---------- channels ----------
    resources :channels, except: [:new, :edit] do
      resources :messages, only: [:create, :index]
      resources :users, only: :index
    end

    # ---------- rooms ----------
    resources :rooms, only: [:index, :create] do
      resources :messages, only: [:create, :index]
      resources :users, only: :index
    end
  end

  # ---------- channels ----------

  delete '/api/channels/leave/:id' => 'api/channels#leave',
         as: 'api_channel_leave',
         defaults: { format: :json }
  post '/api/channels/join/:id' => 'api/channels#join',
       as: 'api_channel_join',
       defaults: { format: :json }
  get '/api/channels/search/:query' => 'api/channels#search',
      as: 'api_channel_search',
      defaults: { format: :json }

  # ---------- rooms ----------

  delete '/api/rooms/leave/:id' => 'api/rooms#leave',
         as: 'api_room_leave',
         defaults: { format: :json }

  root to: 'static_pages#root'
end
