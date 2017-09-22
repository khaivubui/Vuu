import React from 'react';

import ChannelFeedContainer from
'./channel_messages/channel_feed_container.js';
import ChannelInputContainer from
'./channel_messages/channel_input_container.js';

const ChannelMessages = props => (
  <div className='channel-messages'>
    <ChannelFeedContainer/>
    <ChannelInputContainer/>
  </div>
);

export default ChannelMessages;
