class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params)
    if @user
      log_in!(@user)
      render :show
    else
      render json: ["Invalid username or password"], status: 400
    end
  end

  def destroy
    if logged_in?
      log_out!
      render json: {}
    else
      render json: ['No session exists'], status: 404
    end
  end
end
