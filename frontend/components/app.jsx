import React from 'react';
import { Route } from 'react-router-dom';

import {
  AuthRoute, ProtectedRoute
} from './custom_routes/custom_routes';
import Splash from './auth_components/splash';
import RegisterFormContainer from './auth_components/register_form_container';
import SignInFormContainer from './auth_components/sign_in_form_container';
import SideBarContainer from './protected_components/side_bar_container';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/register" component={RegisterFormContainer}/>
    <AuthRoute exact path="/signin" component={SignInFormContainer}/>
    <ProtectedRoute path ='/messages' component={SideBarContainer}/>
  </div>
);

export default App;
