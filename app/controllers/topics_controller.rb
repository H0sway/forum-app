class CommentsController < ApplicationController
  def index
    @topics = Topic.all
    render json: @topics
  end

  def show
    @topic = Topic.find(params[:id])
    render json: @show
  end
end
