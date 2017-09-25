import React from 'react';

export default class UsersSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  componentDidMount () {
    this.refs.searchBox.focus();
    // if (this.state.query === '') {
    //   this.props.clearSearch();
    // }
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

  handleKeyDown (e) {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  render () {
    const { closeModal } = this.props;
    return (
      <div
        className='search'
        onKeyDown={e => this.handleKeyDown(e)}>
        <h1 className='modal-header'>
          <span>Search Users</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={closeModal}></i>
        </h1>
        <input
          ref='searchBox'
          type='text'
          placeholder='Search...'
          value={this.state.query}
          onChange={e => this.searchUsers(e)}/>
        <ul className='users-search-results'>

        </ul>
      </div>
    );
  }
}
