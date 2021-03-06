class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    if params[:channel_id]
      @context = Channel.find(params[:channel_id])
    elsif params[:room_id]
      @context = Room.find(params[:room_id])
    end
    @message.context = @context
    @message.save
  end

  def index
    if params[:channel_id]
      @context = Channel.find(params[:channel_id])
    elsif params[:room_id]
      @context = Room.find(params[:room_id])
    end
    @messages = @context.messages
    @users = @messages.map(&:user).uniq
    render :index
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
