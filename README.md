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
- [Direct Messages](#direct-messages)
- [Group Messages](#group-messages)

## User Authentication
Users are able to register for an account, sign in, and sign out. Using `BCrypt`, Vuu securely stores passwords in the database. Using `SecureRandom`, users are ensured to have a unique `session_token`, identifying that the session belongs to the correct user. This `session_token` is reset on sign in and on sign out.

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
Plain passwords are not stored in the database. Vuu uses BCrypt to store passwords
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

## Live Chat
Live communication is enabled using Action Cable, the default solution to WebSockets in Rails 5.

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
