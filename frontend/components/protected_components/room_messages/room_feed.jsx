import React from 'react';

import MessageContainer from '../message_container';

export default class RoomFeed extends React.Component {
  componentDidMount () {
    this.props.fetchRoomMessagesWithUsers(
      this.props.match.params.roomId
    ).then(() => this.refreshScroll());
  }

  refreshScroll () {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  render () {
    const { room } = this.props;
    const { users } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message => <MessageContainer key={message.id}
                          user={users[message.userId]}
                          message={message}/>
    );

    if (room) {
      return (
        <div className='feed'>
          <div className='context-information'>
            <h1>BLAHHHH</h1>
            #BLAHHH
          </div>
          <ul className='messages' ref='messages'>
            {messages}
          </ul>
        </div>
      );
    } else {
      // When just refreshed and room isn't fetched yet.
      // Not really necessary, now that we have RestrictedRoute
      return (
        <div className='feed'>
        </div>
      );
    }
  }
}
