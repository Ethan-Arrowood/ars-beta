import React from 'react';
import { browserHistory } from 'react-router';
import firebase from '../../firebaseConfig.js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { green500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: undefined,
      userEmail: undefined,
      open: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    this.setState({open: true});
  }
  handleClose() {
    this.setState({open: false});
    browserHistory.push('/login');
  }
  handleSubmit(e) {

    let email = e.target.email.value;

    e.preventDefault();

    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({
        userEmail: email
      });
      this.handleOpen();
    }).catch((err) => {
      console.log('error: ', err);
      let errorCode = err.code;

      let emailError;
      switch(errorCode) {
        case "auth/invalid-email":
          emailError = "Invalid email address";
          break;
        case "auth/user-not-found":
          emailError = "No user found";
          break;
        default:
          emailError = "Something is not working in ForgotPassword.js";
          break;
      }

      this.setState({
        emailError
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
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <div className="auth__inner">
        <h1>Forget your password?</h1>
        <p>Enter your email below and we will send you a password-reset email shortly.</p>
        <form className="auth__form" onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            name="email"
            type="email"
            hintText="your@email.com"
            errorText={this.state.emailError}
            floatingLabelText="Email"
            className="auth__input"
          />
          <FlatButton
            label="Reset Password"
            primary={true}
            fullWidth={true}
            className="auth__button"
            style={buttonStyle}
            type="submit"
            onTouchTap={() => {}}
          />

          <Dialog
            title="Password Reset Email Sent!"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            We sent a password reset email to <strong>{this.state.userEmail}</strong>
          </Dialog>
        </form>
      </div>
    );
  }
}
