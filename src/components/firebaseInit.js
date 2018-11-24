import firebase from 'firebase/app'
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
});

export default db
