import React from 'react';

import MessageContainer from '../message_container';

export default class ChannelFeed extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loader: ''
    };
    if (!props.messages[0]) {
      this.state.loader = <div className="loader"></div>;
    }
  }

  componentWillUnmount () {
    clearTimeout(this.updateLastReadTimeout);
  }

  componentDidMount () {
    const {
      fetchChannelMessagesWithUsers, updateLastRead, match
    } = this.props;

    fetchChannelMessagesWithUsers(
      match.params.channelId
    ).then(
      () => this.refreshScroll()
    ).then(
      () => this.setState({ loader: '' })
    );

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
      if (!newProps.messages[0]) {
        this.setState({ loader: <div className="loader"></div> });
      }

      fetchChannelMessagesWithUsers(
        newProps.match.params.channelId
      ).then(
        () => this.refreshScroll()
      ).then(
        () => this.setState({ loader: '' })
      );

      clearTimeout(this.updateLastReadTimeout);
      this.updateLastReadTimeout = setTimeout(
        () => updateLastRead(newProps.match.params.channelId),
        1500
      );
    }

    // check for new message
    if (this.props.channel.messageIds.length !==
        newProps.channel.messageIds.length) {
      updateLastRead(match.params.channelId);
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
    const { channel, users, currentUser } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message =>
      <MessageContainer key={message.id}
        user={users[message.userId]}
        message={message}
        isNew={currentUser.lastReadByChannelIds[channel.id] < message.id}/>
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
            {this.state.loader}
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
