import React from 'react';

export default class RoomSettings extends React.Component {
  render () {
    console.log(this.props);
    const { room, users } = this.props;
    const usersString = room.userIds.map(
      userId => users[userId].displayname || users[userId].username
    ).join(', ');
    return (
      <div className='settings'>
        <h1 className='modal-header'>
          <span>{'Direct Message' || room.displayname}</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}>
          </i>
        </h1>
        {room.userIds.length} users: {usersString}

        <button
          className='modal-button leave'>
          Leave Room
        </button>
      </div>
    );
  }
}
