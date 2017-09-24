class RoomsController < ApplicationController
  def index
    @rooms = current_user.rooms
    render :index
  end

  def create
    @room = Channel.new(room_params)
    if @room.save
      current_user.become_admin(@room)
      render :show
    else
      render json: @room.errors.full_messages, status: 422
    end
  end
end
