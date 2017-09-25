class MessageRelayJob < ApplicationJob
  def perform(message, context)
    message_json = Api::MessagesController.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )

    user_json = Api::UsersController.render(
      partial: 'api/users/user',
      locals: { user: message.user }
    )

    if message.context_type == 'Channel'
      context_json = Api::ChannelsController.render(
      partial: 'api/channels/channel',
      locals: { channel: message.context }
      )
    else
      context_json = Api::ChannelsController.render(
      partial: 'api/rooms/room',
      locals: { room: message.context }
      )
    end

    context.users.each do |user|
      ActionCable.server.broadcast(
      "user_#{user.username}",
      message: JSON.parse(message_json),
      users: { message.user.id => JSON.parse(user_json) },
      message.context_type.downcase => JSON.parse(context_json))
    end
  end
end
