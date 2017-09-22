import React from 'react';

export default class ChannelInput extends React.Component {
  componentDidMount () {
    this.refs.input.focus();
  }

  render () {
    return (
      <div className='channel-input'>
        <input
          ref='input'
          type='text'
          placeholder='Enter a message...'/>
      </div>
    );
  }
}
