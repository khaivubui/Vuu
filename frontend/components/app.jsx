import React from 'react';
import { Route } from 'react-router-dom';

import {
  AuthRoute, ProtectedRoute
} from './custom_routes/custom_routes';
import RestrictedRoute from './custom_routes/restricted_route';

// AuthRoutes
import Splash from './auth_components/splash';
import RegisterFormContainer from './auth_components/register_form_container';
import SignInFormContainer from './auth_components/sign_in_form_container';

// ProtectedRoutes
import SidePanel from './protected_components/side_panel';
import UserShowContainer from './protected_components/user_show_container';
import ChannelMessages from './protected_components/channel_messages';
import RoomMessages from './protected_components/room_messages';

const App = () => (
  <div>
    <AuthRoute exact path="/" component={Splash}/>
    <AuthRoute exact path="/register" component={RegisterFormContainer}/>
    <AuthRoute exact path="/signin" component={SignInFormContainer}/>

    <div className='protected'>
      <ProtectedRoute path='/messages' component={SidePanel}/>

      <RestrictedRoute
        path='/messages/channels/:channelId'
        component={ChannelMessages}/>
      <RestrictedRoute
        path='/messages/rooms/:roomId'
        component={RoomMessages}/>
      
      <ProtectedRoute path='/messages' component={UserShowContainer}/>
    </div>
    <Route path='/messages' render={() => <div className='logo'>Vuu</div>}/>

  </div>
);

export default App;
