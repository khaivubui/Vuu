import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Channels extends React.Component {
  componentDidMount () {
    this.props.fetchChannels(this.props.currentUser.id);
  }

  render () {
    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map(channel =>
        <li key={channel.id}>
          <NavLink to={`/messages/channels/${channel.id}`}>
            {channel.channelname}
          </NavLink>
        </li>
      );
    } else {
      channels = 'no channels';
    }
    return (
      <div className='channels side-panel-component'>
        <h1>Channels</h1>
        <ul>
          {channels}
        </ul>
      </div>
    );
  }
}
