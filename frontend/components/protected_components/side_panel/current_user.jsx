import React from 'react';

export default class CurrentUser extends React.Component {
  render () {
    const { currentUser } = this.props;
    return (
      <div className='current-user side-panel-component'>
        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
        <div>
          <h1>
            {currentUser.displayname || currentUser.username}
          </h1>
          <span className='username'>{currentUser.username}</span>
        </div>
      </div>
    );
  }
}
