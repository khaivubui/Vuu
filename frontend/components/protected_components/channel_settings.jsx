import React from 'react';

import UpdateChannelForm from './update_channel_form';

export default class ChannelSettings extends React.Component {
  constructor (props) {
    super(props);
  }

  leaveChannel () {
    this.props.leaveChannel(this.props.channel.id);
    this.props.closeModal();
  }

  render () {
    const { channel } = this.props;
    return (
      <div className='channel-settings'>
        <h1>{channel.displayname || channel.channelname}
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}></i>
        </h1>

        <UpdateChannelForm
          channel={this.props.channel}
          updateChannel={this.props.updateChannel}/>

        <button
          onClick={e => this.leaveChannel()}>
          Leave Channel
        </button>
      </div>
    );
  }
}
