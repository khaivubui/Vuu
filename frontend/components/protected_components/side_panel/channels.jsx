import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Channels extends React.Component {
  componentDidMount () {
    this.props.fetchChannels();
  }

  render () {
    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map(channel =>
        <li key={channel.id}>
          <NavLink
            to={`/messages/channels/${channel.id}`}>
            {channel.channelname}
          </NavLink>
        </li>
      );
    } else {
      channels = 'no channels';
    }
    return (
      <div className='channels side-panel-component'>
        <h1>Channels
          <NavLink to='/messages/channels/new'>
            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
          </NavLink>
        </h1>
        <ul>
          {channels}
        </ul>
      </div>
    );
  }
}
