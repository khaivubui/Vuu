class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params)
    if @user
      sign_in!(@user)
      render :show
    else
      render json: ["Invalid username or password"], status: 400
    end
  end

  def destroy
    if current_user
      sign_out!
      render json: {}
    else
      render json: ['No session exists'], status: 404
    end
  end
end
