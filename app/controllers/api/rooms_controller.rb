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
    @room.users.each do |user|
      CurrentUserRelayJob.perform_later(user)
    end
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

  def add
    @room = Room.find(params[:room_id])
    @user = User.find(params[:id])
    @room.users << @user
    RoomRelayJob.perform_later(@room, @room.users.to_a)
    @room.users.each do |user|
      CurrentUserRelayJob.perform_later(user)
    end
  end

  def update_last_read
    @room = Room.find(params[:id])
    @room
      .room_memberships
      .where(user: current_user)[0]
      .update(last_read_message_id: @room.messages.last.id)
    CurrentUserRelayJob.perform_later(current_user)
  end
end
