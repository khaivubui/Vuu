import React from 'react';

export default ({ user, message }) =>
<li className='message'>
  <span className='user'>{user.displayname || user.username}</span>
  : {message.body}
</li>;
