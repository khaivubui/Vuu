class RoomsController < ApplicationController
  def index
    @rooms = current_user.rooms
    render :index
  end

  def create
    @room = Room.create
    @room.user_ids = [current_user.id, *params[:userIds]]
    render :show
  end
end
