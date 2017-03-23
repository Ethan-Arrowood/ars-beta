import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <div className="auth__inner">
        <Link to="login" className="auth__link">Login</Link>
        <Link to="signup" className="auth__link">Signup</Link>
        <Link to="forgotpassword" className="auth__link">Forgot Password</Link>
        <Link to="verifyaccount" className="auth__link">Verify Account</Link>
      </div>
    );
  }
}
