import React from 'react';

export default ({ channel, joinChannel, currentUser }) => (
  <div className='channel-search-item'>
    <div className='information'>
      <strong>{channel.displayname || channel.channelname}</strong><br/>
      {channel.channelname}
    </div>
    {(channel.userIds.includes(currentUser.id)) ?
      <button className='disabled'>Joined</button> :
      <button className='enabled'
        onClick={joinChannel}>Join</button>}
  </div>
);
