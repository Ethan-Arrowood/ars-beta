import React from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import bodymovin from 'bodymovin';
import firedata from './auth/data.json';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    }

    this.renderTabs = this.renderTabs.bind(this);
  }
  renderTabs() {
    const path = this.props.location.pathname;
    let list = [
      { label: "Log In", path: "/login" },
      { label: "Sign Up", path: "/signup" },
      { label: "Forgot Password", path: "/forgotpassword" } ];
    const vA = { label: "Verify Account", path: "/verifyaccount" };
    if ( path === "/verifyaccount" ) list.push(vA);

    return list.map((tab, i) => {
      const {label, path} = tab;
      return (
        <Tab key={i} label={label} onActive={
          () => browserHistory.push(path)
        }></Tab>
      )
    });

  }
  componentWillMount() {
    const path = this.props.location.pathname;
    let tab = 0;
    switch (path) {
      case "/login":
        tab = 0;
        break;
      case "/signup":
        tab = 1;
        break;
      case "/forgotpassword":
        tab = 2;
        break;
      case "/verifyaccount":
        tab = 3;
        break;
      default:
        tab = 0;
        break;
    }
    this.setState({ tab });
    console.log(path);
  }
  componentDidMount() {
    bodymovin.loadAnimation({
      container: document.getElementById('fire'),
      animType: 'svg',
      loop: true,
      autoplay: true,
      animationData: firedata
    });
  }
  render() {

    return (
      <div className="auth">
        <AppBar title="Camp Arrowood"/>
        <div className="auth__wrapper">
          <Paper zDepth={2} rounded={false}>

            <div id="fire" className="fire"/>

            {this.props.children}
            <Tabs
              initialSelectedIndex={this.state.tab}
              contentContainerClassName="auth-animate">
              {this.renderTabs()}
            </Tabs>
          </Paper>
        </div>
      </div>
    );
  }
}
