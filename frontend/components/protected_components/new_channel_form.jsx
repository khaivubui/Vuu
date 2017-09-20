import React from 'react';

export default class NewChannelForm extends React.Component {
  render () {
    return (
      <form className='new-channel-form'>
        <h1>New Channel</h1>
        <label>channelname:</label>
        <input type='text'/>
        <label>displayname: (optional)</label>
        <input type='text'/>
        <input type='submit' value='Create New Channel'/>
      </form>
    );
  }
}
