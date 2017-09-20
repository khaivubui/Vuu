import React from 'react';

export default class ChannelSearch extends React.Component {
  searchChannels (query) {
    clearTimeout(this.searching);
    this.searching = setTimeout(
      () => this.props.searchChannels(query),
      200
    );
  }

  render () {
    return (
      <div className='channel-search'>
        <input
          type='text'
          onChange={e => this.searchChannels(e.target.value)}/>
      </div>
    );
  }
}
