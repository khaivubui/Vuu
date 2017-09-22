class MessageRelayJob < ApplicationJob
  def perform(message, channel)
    user_json = Api::UsersController.render(
    partial: 'api/users/user',
    locals: { user: message.user }
    )
    message_json = Api::MessagesController.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )
    ActionCable.server.broadcast("channel_#{channel.channelname}",
                                 message: JSON.parse(message_json),
                                 users: { message.user.id => user_json})
  end
end
