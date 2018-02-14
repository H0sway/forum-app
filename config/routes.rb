Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: :app
  scope :api do
    resources :topics, :posts, :comments
  end
end
