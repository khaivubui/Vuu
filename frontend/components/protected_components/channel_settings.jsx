import React from 'react';
import Modal from 'react-modal';

import UpdateChannelForm from './update_channel_form';

export default class ChannelSettings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      updateFormIsOpen: false,
      modalStyle: {
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
      }
    };
  }

  leaveChannel () {
    this.props.leaveChannel(this.props.channel.id);
    this.props.closeModal();
  }

  openUpdateForm () {
    this.setState({updateFormIsOpen: true});
  }

  closeUpdateForm () {
    this.setState({updateFormIsOpen: false});
  }

  render () {
    const { channel } = this.props;
    const updateChannel =
          channel.adminIds.includes(this.props.currentUser.id) ?
          <button className='modal-button updateChannel'
            onClick={e => this.openUpdateForm()}>
            Update Channel
          </button> :
          '';

    return (
      <div className='channel-settings'>
        <h1 className='modal-header'>
          <span>{channel.displayname || channel.channelname}</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}>
          </i>
        </h1>
        #{channel.channelname}<br/>
        {channel.userIds.length} users

        {updateChannel}

        <button className='modal-button leaveChannel'
          onClick={e => this.leaveChannel()}>
          Leave Channel
        </button>

        <Modal
          contentLabel='UpdateChannelForm'
          isOpen={this.state.updateFormIsOpen}
          style={this.state.modalStyle}>
          <UpdateChannelForm
            closeModal={() => this.closeUpdateForm()}
            channel={this.props.channel}
            errors={this.props.errors}
            updateChannel={this.props.updateChannel}/>
        </Modal>
      </div>
    );
  }
}
