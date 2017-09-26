import React from 'react';
import { Link } from 'react-router-dom';

export default class Splash extends React.Component {
  render () {
    return (
      <div className='splash'>
        <h1>Vuu</h1>
        <div>
          <span>
            Your one stop for all group chat solutions
            <a href='https://github.com/khaivubui/Vuu' target='_blank'>
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </span>
          <div>
            <Link to='/register'><button>Register</button></Link>
            <Link to='/signin'><button>Sign In</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
