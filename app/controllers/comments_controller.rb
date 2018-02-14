class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]
  def index
    @comments = Comment.all
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
    if @comment.update (comment_params)
      puts "Updated comment"
      render json: @comment
    else
      raise "Error!"
    end
  end
  def destroy
    if @comment.delete
      puts "Deleted comment"
      render json: Comment.all
    else
      raise "Error!"
    end
  end
  private
  def comment_params
    params.require(:comment).permit(:name, :comment_text, :post_id)
  end
  def set_comment
    @comment = Comment.find(params[:id])
  end
end
