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

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def leave
    @channel = Channel.find(params[:id])
    @channel.users.delete current_user
    if @channel.users.empty?
      @channel.delete
    end
    render json: params[:id]
  end

  def join
    @channel = Channel.find(params[:id])
    @channel.users << current_user
    render :show
  end

  def search
    @channels = Channel.search params[:query]
    render :index
  end

  def update_last_read
    @channel = Channel.find(params[:id])
    @channel
      .channel_memberships
      .where(user: current_user)[0]
      .last_read_message_id = @channel.messages.last
    CurrentUserRelayJob.perform_later(current_user)
  end

  private

  def channel_params
    params.require(:channel).permit(:channelname, :displayname)
  end
end
