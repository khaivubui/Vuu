class Api::RoomsController < ApplicationController
  def index
    @rooms = current_user.rooms
    @users = @rooms.map(&:users).flatten.uniq
    render :index
  end

  def create
    @room = Room.create
    @room.user_ids = [current_user.id, *params[:userIds]]
    @users = [current_user.id, *params[:userIds]].map do |user_id|
      User.find(user_id)
    end
    RoomRelayJob.perform_later(@room, @users)
    render :show
  end

  def leave
    @room = Room.find(params[:id])
    @room.users.delete current_user
    if @room.users.empty?
      @room.delete
    end

    unless @room.users.empty?
      RoomRelayJob.perform_later(@room, @room.users.to_a)
    end
    CurrentUserRelayJob.perform_later(current_user)

    render json: params[:id]
  end
end
