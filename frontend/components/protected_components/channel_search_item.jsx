import React from 'react';

export default ({ channel }) => (
  <div className='channel-search-item'>
    <div className='information'>
      <strong>{channel.displayname || channel.channelname}</strong><br/>
      {channel.channelname}
    </div>
    <button>Join</button>
  </div>
);
