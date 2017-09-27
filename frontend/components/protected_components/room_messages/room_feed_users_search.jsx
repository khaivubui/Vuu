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

  componentDidUpdate (prevProps) {
    if (this.props.usersSearchIsOpen && !prevProps.usersSearchIsOpen) {
      this.refs.searchBox.focus();
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
    const { usersSearchResults, room, addUser } = this.props;
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
              <div>
                {result.displayname || result.username}<br/>
                {result.username}
              </div>
              {room.userIds.includes(result.id) ?
                <button disabled='true'>Added</button> :
                <button onClick={() => addUser(room.id, result.id)}>
                  Add User
                </button>
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}
