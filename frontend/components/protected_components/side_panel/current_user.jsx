import React from 'react';

export default class CurrentUser extends React.Component {
  render () {
    const { currentUser } = this.props;
    return (
      <div className='current-user'>
        {currentUser.displayname || currentUser.username}
        <br/>
        <span className='username'>{currentUser.username}</span>
      </div>
    );
  }
}
