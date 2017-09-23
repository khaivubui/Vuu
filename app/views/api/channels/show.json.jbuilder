# json.extract! @channel, :id,
#                         :channelname,
#                         :displayname,
#                         :user_ids,
#                         :admin_ids,
#                         :message_ids

json.partial! 'api/channels/channel', channel: @channel
