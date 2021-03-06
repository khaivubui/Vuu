import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

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
          'boxShadow'           : '1px 1px 3px #666'
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
    const { currentUser } = this.props;

    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map(channel =>
        <li key={channel.id}>
          <div className='channel-display-name'>
          <NavLink
            to={`/messages/channels/${channel.id}`}>
            {channel.displayname || channel.channelname}
            <span
              className='new-message-count'
              hidden={
                parseInt(this.props.location.pathname.slice(19)) === channel.id
              }>
              {channel.messageIds.filter(
                messageId =>
                messageId > currentUser.lastReadByChannelIds[channel.id]
              ).length || ''}
            </span>
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
          <span onClick={e => this.openNewChannelForm()}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </span>
        </h1>
        <ul>
          {channels}
        </ul>
        <button onClick={() => this.openChannelSearch()}>
          Join a Channel
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

// <i
//   className="fa fa-plus-square-o fa-lg"
//   aria-hidden="true"
//   onClick={e => this.openNewChannelForm()}>
// </i>
