import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

import {
  receiveMessage
} from '../../../actions/messages/messages_actions';
import NewChannelFormContainer from '../new_channel_form_container';
import ChannelSettingsContainer from '../channel_settings_container';
import ChannelSearchContainer from '../channel_search_container';

export default class Channels extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      newFormIsOpen: false,
      settingsIsOpen: false,
      settingsChannelId: null,
      searchIsOpen: false,
      modalStyle: {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          'border'              : 'none',
          'boxShadow'          : '1px 1px 3px #666'
        }
      }
    };
  }

  // create some kind of function that creates a socket connection
  // (possibly delete all others) and run that function where needed (onEnter?)
  setSocket (channelName) {
    if (window.App.channel) {
      this.removeSocket();
    }
    this.addSocket(channelName);
  }

  // helper
  removeSocket () {
    window.App.cable.subscriptions.remove(window.App.channel);
  }

  // helper
  addSocket (channelName) {
    window.App.channel = window.App.cable.subscriptions.create({
      channel: 'ChannelChannel',
      channel_name: channelName
    }, {
      connected: () => {},
      disconnected: () => {},
      received: (data) => {
        this.props.store.dispatch(receiveMessage(data.message));
      }
    });
  }

  componentDidMount () {
    this.props.fetchChannels();
    this.props.channels.forEach(channel =>
      this.setSocket(channel.channelname)
    );
  }

  openNewChannelForm () {
    this.setState({newFormIsOpen: true});
  }

  closeNewChannelForm () {
    this.setState({newFormIsOpen: false});
  }

  openChannelSettings (channelId) {
    this.setState({
      settingsIsOpen: true,
      settingsChannelId: channelId
    });
  }

  closeChannelSettings () {
    this.setState({settingsIsOpen: false});
  }

  openChannelSearch () {
    this.setState({searchIsOpen: true});
  }

  closeChannelSearch () {
    this.setState({searchIsOpen: false});
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
          onClick={e => this.openChannelSettings(channel.id)}>
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
              className="fa fa-plus-square-o fa-lg"
              aria-hidden="true"
              onClick={e => this.openNewChannelForm()}>
            </i>
        </h1>
        <ul>
          {channels}
        </ul>
        <button onClick={() => this.openChannelSearch()}>
          Join a channel
        </button>

        <div className='modals'>
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
            <ChannelSettingsContainer
              closeModal={() => this.closeChannelSettings()}
              channelId={this.state.settingsChannelId}/>
          </Modal>
          <Modal
            contentLabel='ChannelSearchContainer'
            isOpen={this.state.searchIsOpen}
            style={this.state.modalStyle}>
            <ChannelSearchContainer
              closeModal={() => this.closeChannelSearch()}/>
          </Modal>
        </div>
      </div>
    );
  }
}
