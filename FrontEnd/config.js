import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'



export const firebaseConfig = {
  apiKey: "Your_API_KEY",
  authDomain: "ENTER_YOUR_credential",
  projectId: "ENTER_YOUR_credential",
  storageBucket: "ENTER_YOUR_credential",
  messagingSenderId: "ENTER_YOUR_credential",
  appId: "ENTER_YOUR_credential"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore

export { auth , firebase,firestore};