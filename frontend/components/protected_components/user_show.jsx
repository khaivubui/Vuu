import React from 'react';
import Modal from 'react-modal';

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    'border'              : 'none',
    'boxShadow'           : '1px 1px 3px #666'
  }
};

export default ({ currentUser, user, isOpen, createRoom, closeUserShow, history }) => {
  let dmButton = <div></div>;

  if (user && currentUser.id !== user.id) {
    if (currentUser.dmUserIds.includes(user.id)) {
      dmButton =
      <button className='modal-button'
        onClick={() =>
          history.push(`/messages/rooms/${currentUser.dmsByUserIds[user.id].id}`)}>
        Open Conversation
      </button>;
    } else {
      dmButton =
      <button className='modal-button'
        onClick={() => createRoom(user.id)}>
        Start Conversation
      </button>;
    }
  }

  return (
    <Modal
      contentLabel='UserShow'
      isOpen={isOpen}
      style={modalStyle}>
      { user && (
        <div className='user-show'>
          <h1 className='modal-header'>
            <span>{ user.displayname || user.username }</span>
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={closeUserShow}></i>
          </h1>
          {user.username}
          {dmButton}
        </div>
      ) }
    </Modal>
  );
};
