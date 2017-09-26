import React from 'react';

export default class RoomFeedUsersSearch extends React.Component {
  render () {
    return (
      <div>
        <input
          hidden={!this.props.usersSearchIsOpen}
          placeholder='Search users...'/>
        <ul>
          <li>test</li>
          <li>test 2</li>
        </ul>
      </div>
    );
  }
}
