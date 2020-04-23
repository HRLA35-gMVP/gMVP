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
window.firestore = firestore;

// Firebase Auth
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();

// User Documents
export const createUserProfileDocument = async (user, additionalData) => {
  // If this function is called somehow without a user, just leave immediately
  if (!user) return;

  // Get a reference to where this user's data is stored
  const userReference = firestore.collection('users').doc(user.uid);

  // From the location reference, retrieve the user's information
  const snapshot = await userReference.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();

    try {
      await userReference.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('createUserProfileDocument Error:', error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userReference = firestore.collection('users').doc(uid);
    const userDocument = await userReference.get();

    /**
     * Set friends to an empty array here
     * Because if we were to do it in createUserProfile
     * Then Google OAuth accounts wouldn't receive them
     */
    if (userDocument.friends === undefined) {
      await userReference.set({
        friends: [],
        groups: [],
        ...userDocument.data()
      });

      // userDocument = await userReference.get();
      // return { uid, ...userDocument.data() };
    }

    // return { uid, ...userDocument.data() };
    return userReference;
  } catch (error) {
    console.error('getUserDocument Error:', error);
  }
};

export default firebase;
