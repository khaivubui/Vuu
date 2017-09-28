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

Vuu is a messaging solution with 7 key features:
- [User Authentication](#user-authentication)
- [Live Chat](#live-chat)
- [Channels](#channels) (with Channel Search)
- [User Search](#user-search)
- [Direct Messages(DM)](#direct-messages)
- [Group Messages](#group-messages)
- [Notification](#notification)

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
    removeSocket();
  }
  addSocket(username, dispatch);
};

// helper
const removeSocket = () => {
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

This pattern sets up the WebSockets subscription to have direct access to the Redux store on the front end, manipulating it based on whatever data is coming from the server in real time. In other words, this enables data from the server to manipulate the Redux store in real time, enabling live messaging and other live features referenced below.

## Channels
Channels are public. Anyone can create a Channel, and anyone can join a Channel. Channels enable live communication between all members in the same Channel. Users can create a Channel using the plus symbol (➕) in the Channels section. When creating a Channel, `channelname` is required and has to be unique, while `displayname` is not required and does not have to be unique. Users can search through existing Channels by clicking 'Join a Channel'. A user can leave a Channel anytime by clicking the settings icon next to the Channel.

## User Search
Enabled throughout Vuu is a User Search feature. It is accessible by clicking the 🔎👤 symbol in Direct Messages section.

![Notification](https://github.com/khaivubui/Vuu/blob/master/docs/user_search.gif)

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

#### Sends Ajax requests to the server on idle
When a user types something into the input field, the component sets time out for 200 milliseconds. If no more input is given from the user within that 200 milliseconds, an Ajax request is sent to the server for the search. This avoids overloading the server with requests while still ensuring a smooth user experience.

```javascript
export default class UsersSearch extends React.Component {
  searchUsers (e) {
    this.setState({
      query: e.target.value
    });
    clearTimeout(this.searching);
    this.searching = setTimeout(
      () => this.props.searchUsers(this.state.query),
      200
    );
  }

  // ....

  render () {
    // ...
    return (
      // ...
      <input
        ref='searchBox'
        type='text'
        placeholder='Search...'
        value={this.state.query}
        onChange={e => this.searchUsers(e)}/>
      // ...
    )
  }
}
```

## Direct Messages
To start a Direct Message with someone, simply click on their `displayname` or `username`, then click on 'Start Conversation'. You can access a list of users by invoking 'User Search', mentioned above, or you can click on any user you come across in a Channel or group.

#### Start a message by clicking on username
Vuu Redux store has a slice for `ui.userShow`
```javascript
const initialState = { isOpen: false, userId: null};

const userShowReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_USER_SHOW:
      return { isOpen: true, userId: action.userId };
    case CLOSE_USER_SHOW:
      return initialState;
    default:
      return state;
  }
};
```

Whenever a username is clicked, `isOpen` is changed to `true` and `userId` is updated to be the `userId` that was clicked on. At the top level of Vuu, there is a `UserShowContainer` that maps the Redux state to `UserShow`, which is only a `Modal`. This `Modal` opens and closes depending on the Redux state, allowing `UserShow` to be accessible anywhere.
```javascript
export default class UserShow extends React.Component {
  // ...
  render () {
    // ...
    return (
      <Modal
        contentLabel='UserShow'
        isOpen={isOpen}
        style={modalStyle}>
        { user && (
          <div className='user-show'>
            <h1 className='modal-header'>
              <span>{ user.displayname || user.username }</span>
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={closeUserShow}></i>
            </h1>
            {user.username}
            {dmButton}
          </div>
        ) }
      </Modal>
    );
  }
}
```

Through this `Modal`, the current user can start a DM.

## Group Messages
You can add more people to your Direct Message, making it a private group message. First, open a Direct Message, then simply by clicking on the people symbol (👥) on the top right of your Direct Message to access User Search. Through User Search you can find people by `username` or `displayname` to add to your Group.

#### Adding more users to the group

Adding more users to the group uses the same search functionality as [User Search](#user-search) mentioned above, but with a different UI. Through this UI, a user can send an Ajax request to the server to add another user to the group. When the request hits the server, the server sends out updated group information to all users in the same group, updating all users of the group in real time

```ruby
class Api::RoomsController < ApplicationController
  def add
    @room = Room.find(params[:room_id])
    @user = User.find(params[:id])
    @room.users << @user
    RoomRelayJob.perform_later(@room, @room.users.to_a)
    # ...
  end
end
```

#### Leaving a group
A user can leave a group by clicking the 'Leave' button in settings. This sends an Ajax request to the server to modify the room, and subsequently broadcasting to all users of the same group about the new room status, updating everyone in real time.
```ruby
class Api::RoomsController < ApplicationController
  def leave
    @room = Room.find(params[:id])
    @room.users.delete current_user
    if @room.users.empty?
      @room.delete
    end

    unless @room.users.empty?
      RoomRelayJob.perform_later(@room, @room.users.to_a)
    end
    CurrentUserRelayJob.perform_later(current_user)

    render json: params[:id]
  end
end
```

#### Group information is updated in real time
Group information is updated in real time using `RoomRelayJob`.

```ruby
class RoomRelayJob < ApplicationJob
  def perform(room, users)
    room_json = Api::ChannelsController.render(
    partial: 'api/rooms/room',
    locals: { room: room }
    )

    users_hash = {}

    users.each do |user|
      users_hash[user.id] = JSON.parse(
        Api::UsersController.render(
          partial: 'api/users/user',
          locals: { user: user }
        )
      )
    end

    users.each do |user|
      ActionCable.server.broadcast(
      "user_#{user.username}",
      room: JSON.parse(room_json),
      users: users_hash
      )
    end
  end
end
```

## Notification
![Notification](https://github.com/khaivubui/Vuu/blob/master/docs/notification.gif)
