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

/**
 * Firebase Solutions
 */

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

/**
 * Firebase Packaged Functionality
 */

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const resetPasswordWithEmail = (email) =>
  auth.sendPasswordResetEmail(email);

export const signOut = () => auth.signOut();

/**
 * Generalized Functionality
 */

const getRef = (collection, UID) => firestore.collection(collection).doc(UID);

/**
 * User Related Functionality
 */

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const uRef = getRef('users', user.uid);

  try {
    const uDoc = await uRef.get();

    if (!uDoc.exists) {
      const { email, displayName, photoURL } = user;
      const createdAt = new Date();

      await uRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    }

    return getUserDocument(user.uid);
  } catch (error) {
    console.error('createUserProfileDocument Error:', error);
    return 'createUserProfileDocument Error';
  }
};

export const getUserDocument = async (UID) => {
  if (!UID) return null;

  const uRef = getRef('users', UID);

  try {
    const uDoc = await uRef.get();

    if (uDoc.data().friends === undefined) {
      await uRef.update({
        friends: { [UID]: 2 },
        challenges: [],
        completed: 0,
        wins: 0
      });
    }

    return uRef;
  } catch (error) {
    console.error('getUserDocument Error:', error);
    return 'getUserDocument Error';
  }
};

export const getFriend = async (friendUID) => {
  if (!friendUID) return null;

  try {
    const fRef = getRef('users', friendUID);
    const fDoc = await fRef.get();

    return fDoc.data();
  } catch (error) {
    console.error('getUserDocument Error:', error);
    return 'getUserDocument Error';
  }
};

export const getChallenge = async (challengeUID) => {
  if (!challengeUID) return null;

  try {
    const cRef = getRef('challenges', challengeUID);
    const cDoc = await cRef.get();

    return cDoc.data();
  } catch (error) {
    console.error('getChallenge Error:', error);
    return error;
  }
};

export const addFriend = async (UID, friendUID) => {
  if (!UID || !friendUID) return null;

  const uRef = getRef('users', UID);
  const fRef = getRef('users', friendUID);

  try {
    const fDoc = await fRef.get();

    if (fDoc.exists) {
      const uDoc = await uRef.get();

      await uRef.update({
        friends: { ...{ [friendUID]: 1 }, ...uDoc.data().friends }
      });

      await fRef.update({
        friends: { ...{ [UID]: 1 }, ...fDoc.data().friends }
      });

      return fDoc.data().displayName;
    }

    return false;
  } catch (error) {
    console.error('addFriend Error:', error);
    return 'addFriend Error';
  }
};

export const editProfile = async (UID, field) => {
  if (!UID) return null;

  const uRef = getRef('users', UID);

  try {
    const check = Object.keys(field)[0];

    if (check === 'displayName') {
      await uRef.update({ displayName: field.displayName });
      return field.displayName;
    }

    return 'editProfile Error #1';
  } catch (error) {
    console.error('editProfile Error:', error);
    return 'editProfile Error #2';
  }
};

/**
 * Challenge Related Functionality
 */

export const createChallengeProfileDocument = async (
  challenge,
  additionalData
) => {
  if (!challenge) return;

  try {
    let challengeRef = await firestore
      .collection('challenges')
      .add({ ...challenge, ...additionalData });

    const CUID = challengeRef.id;

    challengeRef = firestore.collection('challenges').doc(CUID);

    const challengeDoc = await challengeRef.get();

    if (challengeDoc.data().CUID === '') {
      await challengeRef.update({
        CUID,
        members: { [auth.currentUser.uid]: { currentStreak: 0 } },
        memberCount: 1
      });
      return CUID;
    } else {
      return challengeRef;
    }
  } catch (error) {
    console.error('createChallengeProfileDocument Error:', error);
    return error;
  }
};

export const setUserChallenges = async (CUID, UID) => {
  if (!CUID || !UID) return;

  try {
    const userRef = firestore.collection('users').doc(UID);
    const userDoc = await userRef.get();

    await userRef.set({
      ...userDoc.data(),
      challenges: [CUID, ...userDoc.data().challenges]
    });

    return;
  } catch (error) {
    console.error('setUserChallenges Error:', error);
    return;
  }
};

export const challengeAdjustMember = async (CUID, UID, additionalData) => {
  if (!CUID || !UID) return;

  console.log('challengeAdjustMember');
  console.log('CUID:', CUID);
  console.log('UID:', UID);

  try {
    const cRef = firestore.collection('challenges').doc(CUID);
    const cDoc = await cRef.get();
    console.log('cDoc');
    console.log(cDoc.data());

    if (cDoc.data().members[UID] === undefined) {
      await cRef.update({
        members: { ...{ [UID]: { currentStreak: 0 } }, ...cDoc.data().members },
        memberCount: cDoc.data().memberCount + 1
      });
      const cDoc2 = await cRef.get();
      console.log('cDoc2');
      console.log(cDoc2.data());
    }
  } catch (error) {
    console.error('challengeAddNewMember Error:', error);
    return 'challengeAddNewMember Error';
  }
};

export default firebase;
