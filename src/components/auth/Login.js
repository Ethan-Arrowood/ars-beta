import React from 'react';
import { browserHistory } from 'react-router';
import firebase from '../../firebaseConfig.js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { green500 } from 'material-ui/styles/colors';

export default class Login extends React.Component {
  handleSubmit(e) {
    let email = e.target.email.value;
    let password = e.target.password.value;

    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      browserHistory.push('/dashboard');
    }).catch((e) => {
      let errorCode = e.code;
      let errorMessage = e.message;
      console.log('Code: ', errorCode, ' /nMessage: ', errorMessage);
    });


  }
  render() {
    const buttonStyle = {
      "marginTop": "1rem",
      "borderWidth": "1px",
      "borderStyle": "solid",
      "borderColor": green500
    };

    return (
      <div className="auth__inner">
        <h1>Welcome!</h1>
        <h1>Please Login:</h1>
        <form className="auth__form" onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            name="email"
            type="email"
            hintText="your@email.com"
            floatingLabelText="Email"
            className="auth__input"
          />
          <TextField
            name="password"
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            className="auth__input"
          />
          <FlatButton
            label="Login"
            primary={true}
            fullWidth={true}
            className="auth__button"
            style={buttonStyle}
            type="submit"
            onTouchTap={() => console.log('Button Pressed')}
          />
        </form>
      </div>
    );
  }
}
