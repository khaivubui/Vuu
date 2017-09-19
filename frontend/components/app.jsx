import React from 'react';
import { Route } from 'react-router-dom';

import {
  AuthRoute, ProtectedRoute
} from './custom_routes/custom_routes';
import Splash from './auth_components/splash';
import RegisterFormComponent from './auth_components/register_form_component';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/register" component={RegisterFormComponent}/>
  </div>
);

export default App;
