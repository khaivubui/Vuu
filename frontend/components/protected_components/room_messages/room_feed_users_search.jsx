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
    console.log(this.props);
    const { usersSearchResults, room } = this.props;
    return (
      <div>
        <input
          ref='searchBox'
          type='text'
          value={this.state.query}
          onChange={e => this.searchUsers(e)}
          hidden={!this.props.usersSearchIsOpen}
          placeholder='Search users...'/>
        <ul className='search-results'>
          {usersSearchResults.map(result =>
            <li key={result.id}>
              {result.username}
              {room.userIds.includes(result.id) ?
                <button disabled='true'>Joined</button> :
                <button>Add User</button>
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}
