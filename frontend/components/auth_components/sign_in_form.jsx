import React from 'react';
import { Link } from 'react-router-dom';

export default class SignInForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
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

  signIn (e) {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  guestLogin (e) {
    this.setState({
      username: 'guest',
      password: 'password'
    });
    this.props.signIn({
      username: 'guest',
      password: 'password'
    });
  }

  render () {
    return (
      <div className='sign-in'>
        <h1>Sign In</h1>
        <Link to='/register'>don't have an account?</Link>

        <form onSubmit={e => this.signIn(e)}>
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

          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={this.state.password}
            onChange={e => this.update(e, 'password')}/>
          <input type='submit' value='Sign In'/>
        </form>
        <a onClick={e => this.guestLogin()}>Guest Login</a>

        <Link to='/'><button>Home</button></Link>
      </div>
    );
  }
}
