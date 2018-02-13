class PostsController < ApplicationController
  before_action :set_post, only: [:show, :destroy]
  def index
    @posts = Post.find(params[:topic_id])
    render json: @posts
  end
  def show
    render json: @post
  end
  def create
    @post = Post.new(post_params)
    if @post.save
      puts "Post saved"
      render json: @post
    else
      raise "Error!"
    end
  end
  def destroy
    if @post.delete
      puts "Post deleted"
      render json: Post.find(params[:id])
    else
      raise "Error!"
    end
  end
  private
  def post_params
    params.permit(:title)
  end
  def set_post
    @post = Post.find(params[:id])
  end
end
