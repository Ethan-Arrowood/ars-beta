import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Auth extends React.Component {
  render() {
    return (
      <div className="auth">
        <AppBar title="Camp Arrowood"/>
        <div className="auth__wrapper">
          <Paper zDepth={2} rounded={false}>
            {/*<h1>Hello from Auth</h1>*/}
            <ReactCSSTransitionGroup component="div" transitionName="auth">
              {this.props.children}
            </ReactCSSTransitionGroup>
            
            <Tabs>
              <Tab label="Log In" onActive={
                () => browserHistory.push("/login")
              }></Tab>
              <Tab label="Sign Up" onActive={
                () => browserHistory.push("/signup")
              }></Tab>
              <Tab label="Forgot Password" onActive={
                () => browserHistory.push("/forgotpassword")
              }></Tab>
            </Tabs>
          </Paper>
        </div>
      </div>
    );
  }
}
