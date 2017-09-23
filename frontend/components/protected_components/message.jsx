import React from 'react';

export default ({ user, message }) =>
<li>
  {user.displayname || user.username}
  : {message.body}
</li>;
