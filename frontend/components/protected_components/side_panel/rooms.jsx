import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

import RoomSettingsContainer from '../room_settings_container';

export default class Rooms extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      // newFormIsOpen: false,
      settingsIsOpen: false,
      settingsRoomId: null,
      // searchIsOpen: false,
      modalStyle: {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          'border'              : 'none',
          'boxShadow'           : '1px 1px 3px #666',
          backgroundColor       : '#e8f2f7'
        }
      }
    };
  }

  componentDidMount () {
    this.props.fetchRoomsAndUsers();
  }

  openRoomSettings (roomId) {
    this.setState({
      settingsIsOpen: true,
      settingsRoomId: roomId
    });
  }

  closeRoomSettings () {
    this.setState({
      settingsIsOpen: false,
      settingsRoomId: null
    });
  }

  render () {
    const { users, currentUser } = this.props;
    let rooms;
    if (this.props.rooms) {
      rooms = this.props.rooms.map(room =>
        <li key={room.id}>
          <div className='room-display-name'>
          <NavLink
            to={`/messages/rooms/${room.id}`}>
            {
              room.userIds
              .filter(id => id !== currentUser.id)
              .map(
                userId => users[userId].displayname || users[userId].username
              ).join(', ') || '(Just Me)'
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

        <Modal
          contentLabel='RoomSettingsContainer'
          isOpen={this.state.settingsIsOpen}
          style={this.state.modalStyle}>
          <RoomSettingsContainer
            closeModal={() => this.closeRoomSettings()}
            roomId={this.state.settingsRoomId}/>
        </Modal>
      </div>
    );
  }
}
