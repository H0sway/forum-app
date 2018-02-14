Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'forum#index'
  scope :api do
    resources :topics, :posts, :comments
  end
end
