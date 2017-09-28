import React from 'react';

import MessageContainer from '../message_container';

export default class ChannelFeed extends React.Component {
  componentDidMount () {
    const {
      fetchChannelMessagesWithUsers, updateLastRead, match
    } = this.props;

    fetchChannelMessagesWithUsers(
      match.params.channelId
    ).then(() => this.refreshScroll());

    this.updateLastReadTimeout = setTimeout(
      () => updateLastRead(match.params.channelId),
      1500
    );
  }

  componentWillReceiveProps (newProps) {
    const {
      fetchChannelMessagesWithUsers, updateLastRead, match
    } = this.props;

    if (match.params.channelId !==
        newProps.match.params.channelId) {
      fetchChannelMessagesWithUsers(
        newProps.match.params.channelId
      ).then(() => this.refreshScroll());

      clearTimeout(this.updateLastReadTimeout);
      this.updateLastReadTimeout = setTimeout(
        () => updateLastRead(newProps.match.params.channelId),
        1500
      );
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.channel.messageIds.length !==
        prevProps.channel.messageIds.length) {
      this.refreshScroll();
    }
  }

  refreshScroll () {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  render () {
    const { channel } = this.props;
    const { users } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message => <MessageContainer key={message.id}
                          user={users[message.userId]}
                          message={message}/>
    );

    if (channel) {
      return (
        <div className='feed'>
          <div className='context-information'>
            <h1>{channel.displayname || channel.channelname}</h1>
            #{channel.channelname}
          </div>
          <ul className='messages' ref='messages'>
            {messages}
          </ul>
        </div>
      );
    } else {
      // When just refreshed and channel isn't fetched yet.
      // Not really necessary, now that we have RestrictedRoute
      return (
        <div className='feed'></div>
      );
    }
  }
}
