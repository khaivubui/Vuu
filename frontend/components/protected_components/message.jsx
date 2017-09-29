import React from 'react';

export default ({ user, message, openUserShow, isNew }) =>
  <li className={isNew ? 'message is-new' : 'message'}>
    <div>
      <span className='user' onClick={() => openUserShow(user.id)}>
        {user.displayname || user.username}
      </span>
      : {message.body}
    </div>
    <div className='timestamp'>
      {new Date(message.createdAt).toLocaleString()}
    </div>
  </li>;
