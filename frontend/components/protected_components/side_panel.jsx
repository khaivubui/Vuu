import React from 'react';

import CurrentUserContainer from './side_panel/current_user_container';
import ChannelsContainer from './side_panel/channels_container';
import RoomsContainer from './side_panel/rooms_container';

export default (props) => (
  <div className='side-panel'>
    <CurrentUserContainer/>
    <ChannelsContainer/>
    <RoomsContainer/>
  </div>
);
