import React from 'react';
import { browserHistory } from 'react-router';
import firebase from '../../firebaseConfig.js';

export default class Signup extends React.Component {
  handleSubmit(e) {
    let email = e.target.email.value;
    let password = e.target.password.value;
    //let confirmPassword = e.target.confirmPassword.value;


    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      browserHistory.push('/verifyaccount');
    }).catch((e) => {
      let errorCode = e.code;
      let errorMessage = e.message;
      console.log('Code: ', errorCode, ' /nMessage: ', errorMessage);
    });


  }
  render() {
    return (
      <div className="auth__inner">
        <h1>Hello from Signup</h1>
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="email"
            className="form__input"
            name="email"
            placeholder="user@email.com"/>
          <input
            type="password"
            className="form__input"
            name="password"
            placeholder="password"/>
          <input
            type="password"
            className="form__input"
            name="confirmPassword"
            placeholder="confirm password"/>
          <button className="button">Sign Up</button>
        </form>
      </div>

    );
  }
}
