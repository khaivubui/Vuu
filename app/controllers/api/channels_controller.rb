class Api::ChannelsController < ApplicationController
  def index
    @channels = User.find(params[:user_id]).channels
    render :index
  end
end
