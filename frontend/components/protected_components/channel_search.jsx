import React from 'react';

import ChannelSearchItem from './channel_search_item';

export default class ChannelSearch extends React.Component {
  searchChannels (query) {
    clearTimeout(this.searching);
    this.searching = setTimeout(
      () => this.props.searchChannels(query),
      200
    );
  }

  componentDidMount () {
    this.refs.searchBox.focus();
  }

  handleKeyDown (e) {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  render () {
    return (
      <div
        className='channel-search'
        onKeyDown={e => this.handleKeyDown(e)}>
        <h1>
          <span>Join a Channel</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}></i>
        </h1>
        <input
          ref='searchBox'
          type='text'
          placeholder='Search...'
          onChange={e => this.searchChannels(e.target.value)}/>
        <ul className='channel-search-results'>
          {this.props.channelSearchResults.map(result =>
            <ChannelSearchItem
              key={result.id}
              channel={result}
              joinChannel={() => this.props.joinChannel(result.id)}
              currentUser={this.props.currentUser}/>
          )}
        </ul>
      </div>
    );
  }
}
