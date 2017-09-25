import React from 'react';

export default class MessageInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      body: ''
    };
  }

  componentDidMount () {
    this.refs.input.focus();
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.createMessage(this.state).then(
      () => this.setState({
        body: ''
      })
    );
  }

  updateBody (e) {
    this.setState({
      body: e.target.value
    });
  }

  handleKeyDown (e) {
    if (e.keyCode === 27) {
      this.setState({
        body: ''
      });
    }
  }

  render () {
    return (
      <form
        onSubmit={e => this.handleSubmit(e)}
        onKeyDown={e => this.handleKeyDown(e)}
        className='message-input'>
        <input
          ref='input'
          type='text'
          value={this.state.body}
          onChange={e => this.updateBody(e)}
          placeholder='Enter a message...'/>
        <input type='submit' value='Send'/>
      </form>
    );
  }
}
