import React from 'react';

export default ({ user, message, openUserShow }) =>
  <li className='message'>
    <span className='user' onClick={() => openUserShow(user.id)}>
      {user.displayname || user.username}
    </span>
    : {message.body}
  </li>;
