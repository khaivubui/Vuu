import React from 'react';

export default class RoomSettings extends React.Component {
  render () {
    const { room } = this.props;

    return (
      <div className='room-settings'>
        <h1 className='modal-header'>
          <span>STUFF</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}>
          </i>
        </h1>
        {room.userIds.length} users

        <button
          className='modal-button'>
          Leave Room
        </button>
      </div>
    );
  }
}
