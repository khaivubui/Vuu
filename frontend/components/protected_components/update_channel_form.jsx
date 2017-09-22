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
      <form className='updateChannelForm'
        onSubmit={() =>
          this.props.updateChannel(this.state).then(this.props.closeModal)
        }>
        <i
          className="fa fa-times"
          aria-hidden="true"
          onClick={this.props.closeModal}></i>
        <ul className='errors'>
          {this.props.errors.map(error =>
            <li key={error}>{error}</li>
          )}
        </ul>
        <label htmlFor='channelname'>channelname</label>
        <input
          id='channelname'
          type='text'
          value={this.state.channelname}
          disabled={true}/>
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
