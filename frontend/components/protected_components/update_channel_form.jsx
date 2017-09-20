import React from 'react';

export default class UpdateChannelForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.props.channel;
  }

  update (e, fieldType) {
    this.setState({
      [fieldType]: e.target.value
    });
  }

  render () {
    return (
      <form onSubmit={() => this.props.updateChannel(this.state)}>
        <label htmlFor='channelname'>channelname</label>
        <input
          id='channelname'
          type='text'
          value={this.state.channelname}
          onChange={e => this.update(e, 'channelname')}/>
        <label htmlFor='displayname'>displayname</label>
        <input
          id='displayname'
          type='text'
          value={this.state.displayname}
          onChange={e => this.update(e, 'displayname')}/>
        <input type='submit' value='Update Channel'/>
      </form>
    );
  }
}
