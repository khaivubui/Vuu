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
- User Authentication
- Live Chat
- Channels (with Channel Search)
- User Search
- Direct Messages
- Group Messages

### User Authentication
Users can register for an account, sign in, and sign out. Using `BCrypt`, Vuu securely stores passwords in the database. Using `SecureRandom`, users are ensured to have a unique `session_token`, identifying that the session belongs to the correct user. This `session_token` is reset on sign in and on sign out.

### Live Chat
Live communication is enabled using Action Cable, the default solution to WebSockets in Rails 5.

### Channels
Channels are public. Anyone can create a channel, and anyone can join a channel. Channels enable live communication between all members in the channel. Users can create a channel using the ➕ symbol in the Channels section. Users can search through existing channels to join by clicking 'Join a Channel'. A user can leave a channel anytime by clicking the settings icon next to the channel.

### User Search
Enabled throughout Vuu is a User Search feature. It is accessible by clicking the 🔎👤 symbol in Direct Messages section.
