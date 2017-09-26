import React from 'react';
// import Modal from 'react-modal';

import MessageContainer from '../message_container';
import UsersSearchContainer from '../users_search_container';
// import UsersAddItem from '../users_add_item';

export default class RoomFeed extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      usersSearchIsOpen: false,
      // modalStyle: {
      //   content : {
      //     top                   : '50%',
      //     left                  : '50%',
      //     right                 : 'auto',
      //     bottom                : 'auto',
      //     marginRight           : '-50%',
      //     transform             : 'translate(-50%, -50%)',
      //     'border'              : 'none',
      //     'boxShadow'           : '1px 1px 3px #666'
      //   }
      // }
    };
  }

  componentDidMount () {
    this.props.fetchRoomMessagesWithUsers(
      this.props.match.params.roomId
    ).then(() => this.refreshScroll());
  }

  componentWillReceiveProps (newProps) {
    if (this.props.match.params.roomId !==
        newProps.match.params.roomId) {
      this.props.fetchRoomMessagesWithUsers(
        newProps.match.params.roomId
      ).then(() => this.refreshScroll());
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.room.messageIds.length !==
        prevProps.room.messageIds.length) {
      this.refreshScroll();
    }
  }

  refreshScroll () {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  toggleUsersSearch (roomId) {
    this.setState({
      usersSearchIsOpen: !this.state.usersSearchIsOpen
    });
  }

  render () {
    const { currentUser, room, users } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message => <MessageContainer key={message.id}
                          user={users[message.userId]}
                          message={message}/>
    );
    const roomUsers = room.userIds.filter(
      id => id !== currentUser.id
    ).map(id => users[id].displayname || users[id].username).join(', ');

    return (
      <div className='feed'>
        <div className='context-information'>
          <h1>{roomUsers}</h1>
          <div className='users-search'>
            <span onClick={() => this.toggleUsersSearch()}>
              <i className="fa fa-plus" aria-hidden="true"></i>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>
            <input
              hidden={!this.state.usersSearchIsOpen}
              placeholder='Search users...'/>
          </div>
        </div>
        <ul className='messages' ref='messages'>
          {messages}
        </ul>
      </div>
    );
  }
}
