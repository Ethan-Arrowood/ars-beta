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
      tab: this.detCurTab(props.location.pathname)
    }

    this.detCurTab = this.detCurTab.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTabList = this.renderTabList.bind(this);
  }
  renderTabList() {
    const path = this.props.location.pathname;
    const tabNum = this.detCurTab(path);
    return (
      <Tabs
        initialSelectedIndex={tabNum}
        contentContainerClassName="auth-animate">
        {this.renderTabs()}
      </Tabs>
    );
  }
  renderTabs() {
    let list = [
      { label: "Log In", path: "/login" },
      { label: "Sign Up", path: "/signup" },
      { label: "Forgot Password", path: "/forgotpassword" } ];
    return list.map((tab, i) => {
      const {label, path} = tab;
      return (
        <Tab key={i} label={label} onActive={
          () => browserHistory.push(path)
        }></Tab>
      )
    });
  }
  detCurTab(path) {
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
      default:
        tab = -1;
        break;
    }
    return tab;
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
  componentWillReceiveProps(nextProps) {
    const path = nextProps.location.pathname;
    this.setState({
      tab: this.detCurTab(path)
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
            {this.renderTabList()}
          </Paper>
        </div>
      </div>
    );
  }
}
