// Dependencies
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

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

// Firebase
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

// Auth + Firestore Functions
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  // If this function is called somehow without a user, just leave immediately
  if (!user) return;

  // Get a reference to where this user's data is stored
  const userRef = firestore.collection('users').doc(user.uid);

  // From the location reference, retrieve the user's information
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('createUserProfileDocument Error:', error);
      return error;
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userRef = firestore.collection('users').doc(uid);
    const userDoc = await userRef.get();

    /**
     * Set friends to an empty array here
     * Because if we were to do it in createUserProfile
     * Then Google OAuth accounts wouldn't receive them
     */
    if (userDoc.data().friends === undefined) {
      await userRef.set({
        friends: {
          [uid]: 2
        },
        challenges: {},
        completed: 0,
        wins: 0,
        ...userDoc.data()
      });
    }

    return userRef;
  } catch (error) {
    console.error('getUserDocument Error:', error);
    return error;
  }
};

export const getFriend = async (friendUID) => {
  if (!friendUID) return null;

  try {
    const friendRef = firestore.collection('users').doc(friendUID);
    const friendDoc = await friendRef.get();

    return friendDoc.data();
  } catch (error) {
    console.error('getUserDocument Error:', error);
    return error;
  }
};

export const getChallenge = async (challengeUID) => {
  if (!challengeUID) return null;

  try {
    const challengeRef = firestore.collection('challenges').doc(challengeUID);
    const challengeDoc = await challengeRef.get();

    return challengeDoc.data();
  } catch (error) {
    console.error('getChallenge Error:', error);
    return error;
  }
};

export const addFriend = async (uid, friendUID) => {
  if (!uid || !friendUID) return null;

  const friend = { [friendUID]: 1 };

  const userRef = firestore.collection('users').doc(uid);

  const friendRef = firestore.collection('users').doc(friendUID);
  const friendSnapshop = await friendRef.get();

  if (friendSnapshop.exists) {
    const userDoc = await userRef.get();

    await userRef.set({
      ...userDoc.data(),
      friends: {
        ...friend,
        ...userDoc.data().friends
      }
    });

    return friendSnapshop.data().displayName;
  }

  return false;
};

export const editProfile = async (uid, field) => {
  if (!uid) return null;

  try {
    const userRef = firestore.collection('users').doc(uid);
    const userDoc = await userRef.get();

    const check = Object.keys(field)[0];

    if (check === 'displayName') {
      await userRef.set({
        ...userDoc.data(),
        displayName: field.displayName
      });
    } else {
      return 'Neither';
    }
  } catch (error) {
    console.error('editProfile Error:', error);
    return error;
  }
};

export default firebase;
