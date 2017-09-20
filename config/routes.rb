Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    # auth
    resources :users, only: :create
    resource :session, only: [:create, :destroy]

    # channels
    resources :channels, except: [:new, :edit]
  end

  delete '/api/channels/leave/:id' => 'api/channels#leave',
         as: 'api_channel_leave',
         defaults: { format: :json }
  get '/api/channels/search/:query' => 'api/channels#search',
      as: 'api_channel_search',
      defaults: { format: :json }

  root to: 'static_pages#root'
end
