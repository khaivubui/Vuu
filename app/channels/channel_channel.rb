class ChannelChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel_#{params[:channelname]}"
  end
end
