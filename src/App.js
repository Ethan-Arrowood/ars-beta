import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// ---- For Material UI ----
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from './styles/baseTheme.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme(baseTheme);
// ---- Material UI Dependency ----

// ----- Component Imports -------
import Auth from './components/Auth.js';
  /* Import auth sub-components */
import Login from './components/auth/Login.js';
import Signup from './components/auth/Signup.js';
import ForgotPassword from './components/auth/ForgotPassword.js';
import VerifyAccount from './components/auth/VerifyAccount.js';

import Dashboard from './components/Dashboard.js';
// ----- End Component Imports ----

import firebase from './firebaseConfig.js';

window.browserHistory = browserHistory;

const verifyUser = (nextState, replace, callback) => {
  let user = firebase.auth().currentUser;
  if (!user) replace(`/login`);
  callback();
}


const App =  (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>

      <Route path="/" component={Auth}>
        <IndexRedirect to="/login"/>
        {/* When user navigates to auth, default to login */}
        <Route path="login" component={Login}/>
        <Route path="signup" component={Signup}/>
        <Route path="forgotpassword" component={ForgotPassword}/>
        <Route path="verifyaccount" component={VerifyAccount}/>
      </Route>

      <Route path="/dashboard" component={Dashboard} onEnter={verifyUser}/>
    </Router>
  </MuiThemeProvider>
);

export default App;
