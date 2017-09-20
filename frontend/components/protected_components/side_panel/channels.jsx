import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

import NewChannelFormContainer from '../new_channel_form_container';

export default class Channels extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      newFormIsOpen: false,
      settingsIsOpen: false,
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

  openNewChannelForm () {
    this.setState({newFormIsOpen: true});
  }

  closeNewChannelForm () {
    this.setState({newFormIsOpen: false});
  }

  openChannelSettings () {
    this.setState({settingsIsOpen: true});
  }

  closeChannelSettings () {
    this.setState({settingsIsOpen: false});
  }

  render () {
    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map(channel =>
        <li key={channel.id}>
          <div className='channel-display-name'>
          <NavLink
            to={`/messages/channels/${channel.id}`}>
            {channel.displayname || channel.channelname}
          </NavLink>
        </div>
        <i
          className="fa fa-cog"
          aria-hidden="true"
          onClick={e => this.openChannelSettings()}>
        </i>
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
              onClick={e => this.openNewChannelForm()}>
            </i>
        </h1>
        <ul>
          {channels}
        </ul>
        <Modal
          contentLabel='NewChannelFormContainer'
          isOpen={this.state.newFormIsOpen}
          style={this.state.modalStyle}>
          <NewChannelFormContainer
            closeModal={() => this.closeNewChannelForm()}/>
        </Modal>
        <Modal
          contentLabel='ChannelSettingsContainer'
          isOpen={this.state.settingsIsOpen}
          style={this.state.modalStyle}>
          'SETTINGS GO HERE'
        </Modal>
      </div>
    );
  }
}
