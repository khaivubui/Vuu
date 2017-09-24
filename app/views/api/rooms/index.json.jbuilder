json.rooms do
  @rooms.each do |room|
    json.set! room.id do
      json.partial! 'api/rooms/room', room: room
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
