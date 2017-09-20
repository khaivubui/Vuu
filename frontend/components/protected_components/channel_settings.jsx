import React from 'react';

export default class ChannelSettings extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.props.channel;
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
        <form>
          <label htmlFor='channelname'>channelname</label>
          <input
            id='channelname'
            type='text'
            value={this.state.channelname}/>
          <label htmlFor='displayname'>displayname</label>
          <input
            id='displayname'
            type='text'
            value={this.state.displayname}/>
          <input type='submit' value='Update Channel'/>
        </form>
        <button
          onClick={e => this.leaveChannel()}>
          Leave Channel
        </button>
      </div>
    );
  }
}
