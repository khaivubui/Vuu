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
      broadcasting_string = "channel_#{context.channelname}"

      context_json = Api::ChannelsController.render(
      partial: 'api/channels/channel',
      locals: { channel: message.context }
      )
    else
      broadcasting_string = "room_#{context.id}"

      context_json = Api::ChannelsController.render(
      partial: 'api/rooms/room',
      locals: { room: message.context }
      )
    end


    ActionCable.server.broadcast(
    broadcasting_string,
    message: JSON.parse(message_json),
    users: { message.user.id => JSON.parse(user_json) },
    message.context_type.downcase => JSON.parse(context_json))
  end
end
