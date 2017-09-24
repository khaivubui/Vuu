import React from 'react';

import RoomFeedContainer from
'./room_messages/room_feed_container';
import RoomInputContainer from
'./room_messages/room_input_container';

const RoomMessages = props => (
  <div className='room-messages'>
    <RoomFeedContainer/>
    <RoomInputContainer/>
  </div>
);

export default RoomMessages;
