class RoomRelayJob < ApplicationJob
  def perform(room, users)
    room_json = Api::ChannelsController.render(
    partial: 'api/rooms/room',
    locals: { room: room }
    )

    users_hash = {}

    users.each do |user|
      users_hash[user.id] = JSON.parse(
        Api::UsersController.render(
          partial: 'api/users/user',
          locals: { user: user }
        )
      )
    end

    users.each do |user|
      ActionCable.server.broadcast(
      "user_#{user.username}",
      room: JSON.parse(room_json),
      users: users_hash
      )
    end
  end
end
