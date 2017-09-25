class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_#{params[:username]}"
  end
end
