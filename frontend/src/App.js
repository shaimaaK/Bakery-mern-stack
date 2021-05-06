import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useState } from 'react'
import { useHistory } from "react-router-dom";


import LayoutRoute from './LayoutRoute';
import AppContext from './AppContext';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import MenuScreen from './screens/MenuScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen'
import LogoutScreen from './screens/LogoutScreen'
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import UpdatePasswordScreen from './screens/UpdatePasswordScreen'
import ReserveTableScreen from './screens/ReserveTableScreen'
import ContactUs from './screens/ContactUs';
import WishlistScreen from './screens/WishlistScreen';

function App() {

  const [globalState, setGlobalState] = useState(
    {
      loggedIn: localStorage.getItem('jwt') ? true : false,
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      profile: null
    }
  )


  return (
    <div>
      <AppContext.Provider value={[globalState, setGlobalState]}>
        <Router>
          <Switch>
            <LayoutRoute path="/" component={HomeScreen} exact={true}/>
            <LayoutRoute path="/about" component={AboutScreen} exact={true}/>
            <LayoutRoute path="/register" component={RegisterScreen} exact={true}/>
            <LayoutRoute path="/logout" component={LogoutScreen} exact={true}/>
            <LayoutRoute path="/reserve-table" component={ReserveTableScreen} exact={true}/>
            <LayoutRoute path="/" component={HomeScreen} exact={true} />
            <LayoutRoute path="/wishlist" component={WishlistScreen} exact={true} />
            <LayoutRoute path="/about" component={AboutScreen} exact={true} />
            <LayoutRoute path="/menu" component={MenuScreen} exact={true} />
            <LayoutRoute path="/contact" component={ContactUs} exact={true} />
            <LayoutRoute path="/register" component={RegisterScreen} exact={true} />
            <LayoutRoute path="/login" component={LoginScreen} exact={true} />
            <LayoutRoute path="/update-password" component={UpdatePasswordScreen} exact={true} />
            <LayoutRoute path="/update-profile" component={UpdateProfileScreen} exact={true} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}
export default App;
