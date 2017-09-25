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
