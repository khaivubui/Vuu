class MessageRelayJob < ApplicationJob
  def perform(message, channel)
    message_json = Api::MessagesController.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )

    user_json = Api::UsersController.render(
      partial: 'api/users/user',
      locals: { user: message.user }
    )

    channel_json = Api::ChannelsController.render(
      partial: 'api/channels/channel',
      locals: { channel: message.context }
    )

    ActionCable.server.broadcast("channel_#{channel.channelname}",
                                 message: JSON.parse(message_json),
                                 users: {
                                   message.user.id => JSON.parse(user_json)
                                 },
                                 channel: JSON.parse(channel_json))
  end
end
