@channels.each do |channel|
  json.set! channel.id do
    json.extract! channel, :id,
                           :channelname,
                           :displayname,
                           :user_ids,
                           :admin_ids,
                           :message_ids
  end
end
