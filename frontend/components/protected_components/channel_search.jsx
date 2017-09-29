import React from 'react';

import ChannelSearchItem from './channel_search_item';

export default class ChannelSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  searchChannels (e) {
    this.setState({
      query: e.target.value
    });
    clearTimeout(this.searching);
    this.searching = setTimeout(
      () => this.props.searchChannels(this.state.query),
      200
    );
  }

  componentDidMount () {
    this.refs.searchBox.focus();
    if (this.state.query === '') {
      this.props.clearSearch();
    }
  }

  handleKeyDown (e) {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  render () {
    const {
      channelSearchResults,
      joinChannel,
      searchChannels,
      currentUser,
      closeModal
    } = this.props;
    const { query } = this.state;
    return (
      <div
        className='search'
        onKeyDown={e => this.handleKeyDown(e)}>
        <h1 className='modal-header'>
          <span>Join a Channel</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={closeModal}></i>
        </h1>
        <input
          ref='searchBox'
          type='text'
          placeholder='Search...'
          value={query}
          onChange={e => this.searchChannels(e)}/>
        <ul className='channel-search-results'>
          {channelSearchResults.map(result =>
            <ChannelSearchItem
              key={result.id}
              channel={result}
              joinChannel={() =>
                joinChannel(result.id).then(
                  () => searchChannels(query)
                )}
              currentUser={currentUser}/>
          )}
        </ul>
      </div>
    );
  }
}
