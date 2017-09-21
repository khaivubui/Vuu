import React from 'react';

import SignOutButton from './sign_out_button';

export default class CurrentUser extends React.Component {
  render () {
    const { currentUser } = this.props;
    return (
      <div className='current-user side-panel-component'>
        <div>
        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
          <h1>
            {currentUser.displayname || currentUser.username}
          </h1>
          <span className='username'>{currentUser.username}</span>
        </div>
        <SignOutButton signOut={this.props.signOut}/>
      </div>
    );
  }
}
