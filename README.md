<!-- # README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->
# [Vuu](http://vuu.herokuapp.com/)

Vuu is a messaging solution with 6 key features:
- [User Authentication](#user-authentication)
- [Live Chat](#live-chat)
- [Channels](#channels) (with Channel Search)
- [User Search](#user-search)
- [Direct Messages(DM)](#direct-messages)
- [Group Messages](#group-messages)

## User Authentication
Users are able to register for an account, sign in, and sign out.

#### Username validation
`username` is required to be unique, lowercase alphanumeric only to ensure consistency across the site
```ruby
class User < ApplicationRecord
  # ...
  validates :username,
            format: {
              with: /\A[a-z0-9_]+\Z/,
              message: "can only have lowercase alphanumeric characters"
            },
            length: { maximum: 16 }
  # ...
end
```

#### Password encryption
Plain passwords are not stored in the database. Vuu uses `BCrypt` to securely encrypt and store passwords
```ruby
class User < ApplicationRecord
  # ...
  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  # ...
end
```

#### Unique session tokens
Using `SecureRandom`, users are ensured to have a unique `session_token`, identifying that the session belongs to the correct user. This `session_token` is reset on sign in and on sign out.

## Live Chat
Live communication is enabled using Action Cable, the default solution to WebSockets in Rails 5.

#### Messages are relayed on creation
Vuu front end creates messages by sending `POST` requests to the server. When each request hits the server, it creates a message in the database:
```ruby
class Api::MessagesController < ApplicationController
  # ...
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    if params[:channel_id]
      @context = Channel.find(params[:channel_id])
    elsif params[:room_id]
      @context = Room.find(params[:room_id])
    end
    @message.context = @context
    @message.save
  end
  # ...
end
```
*Note*: `message` is polymorphic. A `message` belongs to a `context` and this `context` can either be a `channel` or `room` (`room` is the same as Direct Message).

After a message is created in the database, it is then broadcasted to all users in the context of the message (be it a Channel or a Direct Message).
```ruby
class Message < ApplicationRecord
  # ...
  after_commit { MessageRelayJob.perform_later(self, self.context) }
  # ...
end
```
```ruby
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
```
This pattern enables the front end to have only 1 WebSockets channel open at all times. This pattern puts less work on the front end and is more secure than having a WebSockets channel open for each Channel/DM.

On the front-end, a client subscribes to a WebSockets channel as soon as a user is signed in:

```javascript
export default class CurrentUser extends React.Component {
  componentDidMount () {
    const { setSocket, currentUser } = this.props;
    setSocket(currentUser.username);
  }
  // ...
}
```

This `setSocket` function is a thunk action-creator, mapped to the `CurrentUser` component using React-Redux:

```javascript
// ...
const mapDispatchToProps = dispatch => ({
  // ...
  setSocket: username => dispatch(setSocket(username))
});
// ...
```
```javascript
export const setSocket = username => dispatch => {
  if (window.App.channel) {
    removeSocket(username);
  }
  addSocket(username, dispatch);
};

// helper
const removeSocket = username => {
  window.App.cable.subscriptions.remove(window.App.channel);
};

// helper
const addSocket = (username, dispatch) => {
  window.App.channel = window.App.cable.subscriptions.create({
    channel: 'UserChannel',
    username
  }, {
    connected: () => {},
    disconnected: () => {},
    received: (data) => {
      if (data.message) {
        dispatch(receiveMessage(data.message));
      }
      if (data.users) {
        dispatch(receiveUsers(data.users));
      }
      if (data.channel) {
        dispatch(receiveChannel(data.channel));
      }
      if (data.room) {
        dispatch(receiveRoom(data.room));
      }
      if (data.currentUser) {
        dispatch(receiveCurrentUser(data.currentUser));
      }
    }
  });
};
```

This pattern sets up the WebSockets subscription to have direct access to the Redux store on the front end, manipulating it based on whatever data is coming back from the server. In other words, this enables real time data from the server to manipulate the Redux store in real time. This enables live messaging and other features below.

## Channels
Channels are public. Anyone can create a Channel, and anyone can join a Channel. Channels enable live communication between all members in the same Channel. Users can create a Channel using the plus symbol (➕) in the Channels section. When creating a Channel, `channelname` is required and has to be unique, while `displayname` is not required and does not have to be unique. Users can search through existing Channels by clicking 'Join a Channel'. A user can leave a Channel anytime by clicking the settings icon next to the Channel.

## User Search
Enabled throughout Vuu is a User Search feature. It is accessible by clicking the 🔎👤 symbol in Direct Messages section.

#### Implemented on the model level
User Search functionality is enabled on the model level using SQL `WHERE`. `ILIKE` is preferred over `LIKE` for case-insensitive search.

```ruby
class User < ApplicationRecord
  # ...
  def self.search(query)
    self.where("username ILIKE ? OR displayname ILIKE ?",
               "%#{query}%",
               "%#{query}%")
  end
  # ...
end
```

## Direct Messages
To start a Direct Message with someone, simply click on their `displayname` or `username`, then click on 'Start Conversation'. You can access a list of users by invoking 'User Search', mentioned above, or you can click on any user in the same Channel as you.

## Group Messages
You can add more people to your Direct Message, making it a private group message. First, open a Direct Message, then simply by clicking on the people symbol (👥) on the top right of your Direct Message to access User Search. Through User Search you can find people by `username` or `displayname` to add to your Group.
