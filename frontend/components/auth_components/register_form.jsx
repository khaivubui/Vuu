import React from 'react';
import { Link } from 'react-router-dom';

export default class RegisterForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      displayname: '',
      password: ''
    };
  }
  
  componentWillUnmount () {
    this.props.clearErrors();
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
        <div className='header'>
          <h1>Register</h1>
          <Link to='/signin'>already have an account?</Link>
        </div>

        <form onSubmit={e => this.register(e)}>
          <ul className='errors'>
            {this.props.errors.map(error =>
              <li key={error}>{error}</li>
            )}
          </ul>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            value={this.state.username}
            onChange={e => this.update(e, 'username')}/>
          <label htmlFor='displayname'>Display Name: (optional)</label>
          <input
            id='displayname'
            type='text'
            value={this.state.displayname}
            onChange={e => this.update(e, 'displayname')}/>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={this.state.password}
            onChange={e => this.update(e, 'password')}/>
          <input type='submit' value='Create Account'/>
        </form>

        <Link to='/'><button>Home</button></Link>
      </div>
    );
  }
}
