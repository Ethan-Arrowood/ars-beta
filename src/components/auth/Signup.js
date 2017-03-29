import React from 'react';
import { browserHistory } from 'react-router';
import firebase from '../../firebaseConfig.js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { green500 } from 'material-ui/styles/colors';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: undefined,
      passwordError: undefined,
      confirmPasswordError: undefined
    }
  }

  handleSubmit(e) {
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    e.preventDefault();

    if ( password === confirmPassword ) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        browserHistory.push('/verifyaccount');
      }).catch((e) => {
        let errorCode = e.code;

        let emailError, passwordError, confirmPasswordError;

        switch(errorCode) {
          case "auth/email-already-in-use":
            emailError = "Account already exists";
            break;
          case "auth/invalid-email":
            emailError = "Enter a valid email address";
            break;
          case "auth/weak-password":
            passwordError = "Weak password warning";
            break;
          default:
            emailError = "Something is not working in Signup.js";
            passwordError = "Something is not working in Signup.js";
            confirmPasswordError = "Something is not working in Signup.js";
            break;
        }

        this.setState({
          emailError,
          passwordError,
          confirmPasswordError
        });
      });
    } else {
       this.setState({
         confirmPasswordError: "Passwords do not match"
       })
    }



  }

  render() {
    const buttonStyle = {
      "marginTop": "1rem",
      "borderWidth": "1px",
      "borderStyle": "solid",
      "borderColor": green500
    };

    let {
      emailError,
      passwordError,
      confirmPasswordError } = this.state;

    return (
      <div className="auth__inner">
        <h1>Welcome!</h1>
        <h1>Please sign up:</h1>
        <form className="auth__form" onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            name="email"
            type="email"
            hintText="your@email.com"
            errorText={emailError}
            floatingLabelText="Email"
            className="auth__input"
            onChange={() => {
              this.setState({
                emailError: undefined
              });
            }}
          />
          <TextField
            name="password"
            type="password"
            hintText="Password"
            errorText={passwordError}
            floatingLabelText="Password"
            className="auth__input"
          />
          <TextField
            name="confirmPassword"
            type="password"
            hintText="Confirm Password"
            errorText={confirmPasswordError}
            floatingLabelText="Confirm Password"
            className="auth__input"
          />
          <FlatButton
            label="Sign Up"
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
