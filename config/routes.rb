Rails.application.routes.draw do
  get '/dublin' => 'dublin#index'
  root 'find_game#index'
end
