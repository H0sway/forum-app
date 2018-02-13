class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :topic, through: :post
end
