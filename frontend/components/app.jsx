import React from 'react';
import { Route } from 'react-router-dom';

import {
  AuthRoute, ProtectedRoute
} from './custom_routes/custom_routes';
import Splash from './auth_components/splash';
import RegisterFormContainer from './auth_components/register_form_container';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/register" component={RegisterFormContainer}/>
  </div>
);

export default App;
