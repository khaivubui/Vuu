import React from 'react';

export default ({ user, message, openUserShow, isCurrentUser }) =>
  <li className={isCurrentUser ? 'message is-current-user' : 'message'}>
    <span className='user' onClick={() => openUserShow(user.id)}>
      {user.displayname || user.username}
    </span>
    : {message.body}
  </li>;
