import React from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';
import Phone from 'material-ui/svg-icons/communication/phone';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import firebase from '../firebaseConfig.js';

export default class Dashboard extends React.Component {
  handleHomeClick(e) {
    browserHistory.push('/dashboard');
  }
  handleSignOut(e) {

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
        <AppBar
          title="Dashboard"
          iconElementLeft={
            <IconButton onTouchTap={this.handleHomeClick.bind(this)}>
              <ActionHome/>
            </IconButton>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon/></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Contact" leftIcon={<Phone/>}/>
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign Out" leftIcon={<ExitToApp/>} onTouchTap={this.handleSignOut.bind(this)}/>
            </IconMenu>
          }
        />


      </div>
    );
  }
}
