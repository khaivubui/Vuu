import React from 'react';

export default ({ user, message, openUserShow, isNew }) =>
  <li className={isNew ? 'message is-new' : 'message'}>
    <span className='user' onClick={() => openUserShow(user.id)}>
      {user.displayname || user.username}
    </span>
    : {message.body}
  </li>;
