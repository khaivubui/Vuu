import React from 'react';

export default class RoomFeedUsersSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  componentWillReceiveProps (newProps) {
    if (this.props.usersSearchIsOpen && !newProps.usersSearchIsOpen) {
      this.props.clearSearch();
      this.setState({
        query: ''
      });
    }
  }

  searchUsers (e) {
    this.setState({
      query: e.target.value
    });
    clearTimeout(this.searching);
    this.searching = setTimeout(
      () => this.props.searchUsers(this.state.query),
      200
    );
  }

  render () {
    const { usersSearchResults } = this.props;
    return (
      <div>
        <input
          ref='searchBox'
          type='text'
          value={this.state.query}
          onChange={e => this.searchUsers(e)}
          hidden={!this.props.usersSearchIsOpen}
          placeholder='Search users...'/>
        <ul>
          {usersSearchResults.map(result =>
            <li key={result.id}>{result.username}</li>
          )}
        </ul>
      </div>
    );
  }
}
