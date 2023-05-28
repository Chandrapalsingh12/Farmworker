import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'



export const firebaseConfig = {
  apiKey: "AIzaSyDcMNFRV2RfoRZzLHelTGEqgwA1U6M9Rdg",
  authDomain: "farmapp-1fec6.firebaseapp.com",
  projectId: "farmapp-1fec6",
  storageBucket: "farmapp-1fec6.appspot.com",
  messagingSenderId: "482642223048",
  appId: "1:482642223048:web:179f9f444b88c15c636afd"
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