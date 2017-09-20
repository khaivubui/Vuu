import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

import NewChannelFormContainer from '../new_channel_form_container';

export default class Channels extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalStyle: {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      }
    };
  }

  componentDidMount () {
    this.props.fetchChannels();
  }

  openModal () {
    this.setState({modalIsOpen: true});
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  render () {
    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map(channel =>
        <li key={channel.id}>
          <NavLink
            to={`/messages/channels/${channel.id}`}>
            <div className='channel-display-name'>
              {channel.displayname || channel.channelname}
            </div>
          </NavLink>
        </li>
      );
    } else {
      channels = 'no channels';
    }

    return (
      <div className='channels side-panel-component'>
        <h1>Channels
            <i
              className="fa fa-plus-square-o"
              aria-hidden="true"
              onClick={e => this.openModal()}>
            </i>
        </h1>
        <ul>
          {channels}
        </ul>
        <Modal
          contentLabel='NewChannelFormContainer'
          isOpen={this.state.modalIsOpen}
          style={this.state.modalStyle}>
          <NewChannelFormContainer closeModal={() => this.closeModal()}/>
        </Modal>
      </div>
    );
  }
}
