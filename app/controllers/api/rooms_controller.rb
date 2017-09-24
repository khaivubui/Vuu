class Api::RoomsController < ApplicationController
  def index
    @rooms = current_user.rooms
    @users = @rooms.map(&:users).flatten.uniq
    render :index
  end

  def create
    @room = Room.create
    @room.user_ids = [current_user.id, *params[:userIds]]
    render :show
  end
end
