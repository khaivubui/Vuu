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

export default ({ user, isOpen, closeUserShow }) =>
<Modal
  contentLabel='UserShow'
  isOpen={isOpen}
  style={modalStyle}>
  <div className='user-show'>
    { user && (user.username || user.displayname) }
  </div>
</Modal>;
