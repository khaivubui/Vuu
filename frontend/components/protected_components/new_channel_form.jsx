import React from 'react';

export default class NewChannelForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      channelname: '',
      displayname: ''
    };
  }

  update (e, fieldType) {
    this.setState({
      [fieldType]: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.createChannel(this.state);
    this.props.closeModal();
  }

  handleKeyDown (e) {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  render () {
    return (
      <form
        className='new-channel-form'
        onSubmit={e => this.handleSubmit(e)}
        onKeyDown={e => this.handleKeyDown(e)}>

        <h1>
          <span>New Channel</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}></i>
        </h1>
        <label htmlFor='channelname'>channelname:</label>
        <input id='channelname'
          type='text'
          value={this.state.channelname}
          onChange={e => this.update(e, 'channelname')}/>
        <label htmlFor='displayname'>displayname: (optional)</label>
        <input id='displayname'
          type='text'
          value={this.state.displayname}
          onChange={e => this.update(e, 'displayname')}/>
        <input type='submit' value='Create New Channel'/>

      </form>
    );
  }
}
