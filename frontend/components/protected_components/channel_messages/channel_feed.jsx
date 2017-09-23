import React from 'react';

import Message from '../message';

export default class ChannelFeed extends React.Component {
  componentDidMount () {
    this.props.fetchChannelMessages(this.props.match.params.channelId);
  }

  componentWillReceiveProps (newProps) {
    if (this.props.match.params.channelId !==
        newProps.match.params.channelId) {
      this.props.fetchChannelMessages(newProps.match.params.channelId);
    }
    if (this.props.messages.length !== newProps.messages.length) {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
    }
  }

  render () {
    const { channel } = this.props;
    const { users } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message => <Message key={message.id}
                          user={users[message.userId]}
                          message={message}/>
    );

    if (channel) {
      return (
        <div className='channel-feed'>
          <div className='channel-information'>
            <h1>{channel.displayname || channel.channelname}</h1>
            #{channel.channelname}
          </div>
          <ul className='messages' ref='messages'>
            {messages}
          </ul>
        </div>
      );
    } else {
      return (
        <div className='channel-feed'></div>
      );
    }
  }
}
