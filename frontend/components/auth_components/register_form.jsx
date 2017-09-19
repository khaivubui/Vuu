import React from 'react';

export default class RegisterForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      displayname: '',
      password: ''
    };
  }

  update (e, fieldType) {
    this.setState({
      [fieldType]: e.target.value
    });
  }

  register (e) {
    e.preventDefault();
    this.props.register(this.state);
  }

  render () {
    return (
      <div className='register'>
        <form onSubmit={e => this.register(e)}>
          <label>Username:
            <input
            type='text'
            value={this.state.username}
            onChange={e => this.update(e, 'username')}/>
          </label>
          <label>Display Name: (optional)
            <input
            type='text'
            value={this.state.displayname}
            onChange={e => this.update(e, 'displayname')}/>
          </label>
          <label>Password:
            <input
            type='password'
            value={this.state.password}
            onChange={e => this.update(e, 'password')}/>
          </label>
          <input type='submit' value='Create Account'/>
        </form>
      </div>
    );
  }
}
