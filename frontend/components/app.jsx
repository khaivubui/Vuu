import React from 'react';
import { Route } from 'react-router-dom';

import {
  AuthRoute, ProtectedRoute
} from './custom_routes/custom_routes';
import Splash from './auth_components/splash';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
  </div>
);

export default App;
