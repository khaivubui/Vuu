class CurrentUserRelayJob < ApplicationJob
  def perform(current_user)
    current_user_json = Api::UsersController.render(
      partial: 'api/users/user',
      locals: { user: current_user }
    )

    ActionCable.server.broadcast(
    "user_#{current_user.username}",
    currentUser: JSON.parse(current_user_json)
    )
  end
end
