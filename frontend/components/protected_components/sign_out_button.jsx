import React from 'react';

export default class SignOutButton extends React.Component {
  render () {
    return (
      <button
        className='sign-out'
        onClick={this.props.signOut}>
        Sign Out
      </button>
    );
  }
}
