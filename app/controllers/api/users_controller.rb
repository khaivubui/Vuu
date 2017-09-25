class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    if params[:channel_id]
      @context = Channel.find(params[:channel_id])
    end
    @users = @context.users
    render :index
  end

  def search
    @users = User.search params[:query]
    render :index
  end
end
