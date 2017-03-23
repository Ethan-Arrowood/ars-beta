import React from 'react';
import {browserHistory} from 'react-router';
import firebase from '../firebaseConfig.js';

export default class Dashboard extends React.Component {
  handleClick(e) {

    firebase.auth().signOut().then(() => {
      browserHistory.push('/');
    }).catch((e) => {
      let errorCode = e.code;
      let errorMessage = e.message;
      console.log('Code: ', errorCode, ' /nMessage: ', errorMessage);
    });
  }
  render() {
    return (
      <div className="container-dashboard">
        <h1>Hello from Dashboard</h1>
        <button
          className="button"
          onClick={this.handleClick.bind(this)}>Log Out</button>
      </div>
    );
  }
}
