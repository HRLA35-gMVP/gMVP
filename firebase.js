// Dependencies
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/**
 * Fine to not gitignore
 * Lets the app know which Google Firebase server the app should talk to
 */

const config = {
  apiKey: 'AIzaSyCHIn-4BWduDME5PSI07pykoOedhtoDmq8',
  authDomain: 'hrla35-mvp.firebaseapp.com',
  databaseURL: 'https://hrla35-mvp.firebaseio.com',
  projectId: 'hrla35-mvp',
  storageBucket: 'hrla35-mvp.appspot.com',
  messagingSenderId: '344292705723',
  appId: '1:344292705723:web:500ebbcdbaa52b86d4309e',
  measurementId: 'G-SGQYM7M1QP'
};

firebase.initializeApp(config);

/**
 * Remove this later
 * For debugging purposes
 */

window.firebase = firebase;

// Firestore for the application
export const firestore = firebase.firestore();

// Auth for the application
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
