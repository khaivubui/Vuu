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
import SignOutButtonContainer
from './protected_components/sign_out_button_container';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/register" component={RegisterFormContainer}/>
    <AuthRoute exact path="/signin" component={SignInFormContainer}/>

    <ProtectedRoute path='/messages' component={SidePanel}/>
    <ProtectedRoute path='/messages' component={SignOutButtonContainer}/>
  </div>
);

export default App;