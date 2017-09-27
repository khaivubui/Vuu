import React from 'react';

export default class NewChannelForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      channelname: '',
      displayname: ''
    };
  }

  componentDidMount () {
    this.refs.channelname.focus();
  }

  componentWillUnmount () {
    this.props.clearErrors();
  }

  update (e, fieldType) {
    this.setState({
      [fieldType]: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.createChannel(this.state)
    .then(({ channel }) =>
      this.props.history.push(`/messages/channels/${channel.id}`))
    .then(this.props.closeModal);
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

        <h1 className='modal-header'>
          <span>Create a Channel</span>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={this.props.closeModal}></i>
        </h1>
        <ul>
          {this.props.errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <input
          ref='channelname'
          type='text'
          placeholder='channelname(alphanumeric only)'
          value={this.state.channelname}
          onChange={e => this.update(e, 'channelname')}/>
        <input
          type='text'
          value={this.state.displayname}
          placeholder='displayname(optional)'
          onChange={e => this.update(e, 'displayname')}/>
        <input type='submit' value='Create New Channel'/>

      </form>
    );
  }
}
