json.extract! user,
              :id,
              :username,
              :displayname,
              :img_url,
              :dm_user_ids

json.dms_by_user_ids do
  user.direct_message_rooms.each do |dmr|
    json.set! dmr.user_ids.reject { |id| id == user.id }[0],
              dmr
  end
end

json.last_read_by_channel_ids do
  user.channels.each do |channel|
    json.set! channel.id,
              channel.channel_memberships.where(
                user: user
              )[0].last_read_message_id
  end
end

json.last_read_by_room_ids do
  user.rooms.each do |room|
    json.set! room.id,
              room.room_memberships.where(
                user: user
              )[0].last_read_message_id
  end
end
