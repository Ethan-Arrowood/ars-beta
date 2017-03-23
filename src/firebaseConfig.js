import firebase from 'firebase';

try {
  var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET
  };
  firebase.initializeApp(config);
} catch (e) {
  console.log(e);
}

export var firebaseRef = firebase.database().ref();
export default firebase;
