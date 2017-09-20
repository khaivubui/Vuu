class Api::ChannelsController < ApplicationController
  def index
    @channels = current_user.channels
    render :index
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      current_user.become_admin(@channel)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:channelname, :displayname)
  end
end