class CommentsController < ApplicationController
  before_action :set_comment, only [:show, :update, :destroy]
  def index
    @comments = Comment.find(params[:post_id])
    render json: @comments
  end
  def show
    render json: @comment
  end
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      puts "Saved comment"
      render json: @comment
    else
      raise "Error"
    end
  end
  def update
    if @song.update
      puts "Updated comment"
      render json: @comment
    else
      raise "Error!"
    end
  end
  def destroy
    if @comment.delete
      puts "Deleted comment"
      render json: @comments
    else
      raise "Error!"
    end
  end
  private
  def comment_params
    params.permit(:name, :comment_text)
  end
  def set_comment
    @comment = Comment.find(params[:post_id])
  end
end
