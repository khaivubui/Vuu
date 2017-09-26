import React from 'react';

export default class UsersSearchItem extends React.Component {
  handleClick () {
    this.props.openUserShow(this.props.user.id);
  }

  render () {
    const { user, openUserShow } = this.props;
    return (
      <div className='users-search-item'>
        <h1 onClick={() => this.handleClick()}>
          {user.displayname || user.username}
        </h1>
        {user.username}
      </div>
    );
  }
}
