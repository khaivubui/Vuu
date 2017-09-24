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

export default ({ currentUser, user, isOpen, createRoom, closeUserShow }) =>
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
      <button className='modal-button'
        onClick={() => createRoom(user.id)}>
        Direct Message
      </button>
    </div>
  ) }
</Modal>;
