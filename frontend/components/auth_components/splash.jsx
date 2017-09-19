import React from 'react';
import { Link } from 'react-router-dom';

export default class Splash extends React.Component {
  render () {
    return (
      <div className='splash'>
        <h1>Vuu</h1>
        <div>
          Your one stop for all group chat solutions
          <br/>
          <Link to='/register'><button>Register</button></Link>
          <Link to='/signin'><button>Sign In</button></Link>
        </div>
      </div>
    );
  }
}
