import React from 'react';
import { Route } from 'react-router-dom';

import {
  AuthRoute, ProtectedRoute
} from './custom_routes/custom_routes';

// AuthRoutes
import Splash from './auth_components/splash';
import RegisterFormContainer from './auth_components/register_form_container';
import SignInFormContainer from './auth_components/sign_in_form_container';

// ProtectedRoutes
import SidePanel
from './protected_components/side_panel';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/register" component={RegisterFormContainer}/>
    <AuthRoute exact path="/signin" component={SignInFormContainer}/>

    <div className='protected'>
      <ProtectedRoute path='/messages' component={SidePanel}/>
    </div>
    <Route path='/messages' render={() => <div className='logo'>Vuu</div>}/>

  </div>
);

export default App;
