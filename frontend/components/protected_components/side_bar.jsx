import React from 'react';

export default class SideBar extends React.Component {
  render () {
    return (
      <button onClick={this.props.signOut}>Sign Out</button>
    );
  }
}
