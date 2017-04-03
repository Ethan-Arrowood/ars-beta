import React from 'react';
import { browserHistory } from 'react-router';
import firebase from '../../firebaseConfig.js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { green500 } from 'material-ui/styles/colors';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: undefined,
      passwordError: undefined
    }
  }

  handleSubmit(e) {
    let email = e.target.email.value;
    let password = e.target.password.value;

    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      browserHistory.push('/dashboard');
    }).catch((e) => {
      let errorCode = e.code;

      let emailError, passwordError;

      switch (errorCode) {
        case "auth/wrong-password":
          passwordError = 'Incorrect password.';
          break;
        case "auth/user-not-found":
          emailError = "User does not exist";
          break;
        case "auth/invalid-email":
          emailError = "Enter a valid email address";
          break;
        case "auth/user-disabled":
          emailError = "This user has been disabled";
          break;
        default:
          emailError = "Something is not working in Login.js";
          passwordError = "Something is not working in Login.js";
          break;
      }

      this.setState({
        emailError,
        passwordError
      });

    });


  }

  render() {
    const buttonStyle = {
      "marginTop": "1rem",
      "borderWidth": "1px",
      "borderStyle": "solid",
      "borderColor": green500
    };

    let { emailError, passwordError } = this.state;

    return (
      <div className="auth__inner">
        <h1>Please login:</h1>
        <form className="auth__form" onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            name="email"
            type="email"
            hintText="your@email.com"
            errorText={emailError}
            floatingLabelText="Email"
            className="auth__input"
          />
          <TextField
            name="password"
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            className="auth__input"
            errorText={passwordError}
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
