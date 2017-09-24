import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Rooms extends React.Component {
  componentDidMount () {
    this.props.fetchRoomsAndUsers();
    // .then(() =>
    // this.props.rooms.forEach(room =>
    //   this.props.setRoomSocket(room.roomname)
    // ));
  }

  render () {
    const { users } = this.props;
    let rooms;
    if (this.props.rooms) {
      rooms = this.props.rooms.map(room =>
        <li key={room.id}>
          <div className='room-display-name'>
          <NavLink
            to={`/messages/rooms/${room.id}`}>
            {
              // room.userIds.map(userId => users[userId].username)
              room.id
            }
          </NavLink>
        </div>
        <i
          className="fa fa-cog"
          aria-hidden="true"
          onClick={e => this.openRoomSettings(room.id)}>
        </i>
        </li>
      );
    } else {
      rooms = 'no rooms';
    }
    return (
      <div className='rooms side-panel-component'>
        <h1>Direct Messages</h1>
        <ul>
          {rooms}
        </ul>
      </div>
    );
  }
}
