//import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import 'firebase/storage';
import { getStorage } from "firebase/storage";
import 'firebase/analytics'

/**
 * 
 * Lets the app know which Google Firebase server the app should talk to
 */

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  // databaseURL: 'https://hrla35-mvp.firebaseio.com',
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

/**
 * Initialize Firebase
 */
 const streakApp = initializeApp(config);
//firebase.analytics();

//const db = getFirestore();

/**
 * Remove this later
 * For debugging purposes
 */

//window.firebase = firebase;

/**
 * Firebase Solutions
 */

//export const firestore = firebase.firestore();
export const firestore = getFirestore();
export const storage = getStorage(streakApp);

export const auth = getAuth();
// apply default browser preference
  //auth().useDeviceLanguage();

/**
 * ************ Firebase Packaged Functionality *************
 */

export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => 
  signInWithPopup(auth, provider);

/**
 * Sign in for returning users
 * @param {*} email 
 * @param {*} password 
 * @returns userCredential
 */
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(email, password)

export const registerWithEmailAndPassword = ( email, password ) => {
  console.log("registering")
  return createUserWithEmailAndPassword(auth, email, password)
}


export const resetPasswordWithEmail = (email) =>
  auth.sendPasswordResetEmail(email);

  /**
   * Sign out
   * @returns 
   */
export const signOutOfApp = () => signOut(auth)

/**
 * Generalized Functionality
 */

/**
 * 
 * @param {*} collection name of collection in the database
 * @param {*} UID unique identifier in db
 */
const getRef = (collection, UID) => 
  //firestore.collection(collection).doc(UID);
  //collection( db, collection )
  doc( firestore, collection, UID )

const performUpdate = async (docRef, updates) =>
  await docRef.update({ ...updates });

/**
 * *********** User Related Functionality ******************
 */

/**
 * Create a new user
 * @param {*} user 
 * @param {*} additionalData 
 * @returns 
 */
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  console.log('creating profile')
  try {
    const uRef = getRef('users', user.uid);
    //const uDoc = await uRef.get();
    const uDoc = await getDoc( uRef );

    if (!uDoc.exists) {
      const { email, displayName, photoURL } = user;
      const createdAt = new Date();

      // await uRef.set({
      //   displayName,
      //   email,
      //   photoURL,
      //   createdAt,
      //   ...additionalData
      // });
      await setDoc( uRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      } )
    }

    return getUserDocument(user.uid);
  } catch (error) {
    console.error('createUserProfileDocument Error:', error);
    return 'createUserProfileDocument Error';
  }
};

/**
 * 
 * @param {*} UID 
 * @returns 
 */
export const getUserDocument = async (UID) => {
  if (!UID) return null;

  const uRef = getRef('users', UID);

  try {
    const uDoc = await uRef.get();

    if (uDoc.data().friends === undefined) {
      const updates = {
        friends: { [UID]: 2, C8gVA1A8ddcaQnawSKoJMVUOTRv2: 1 },
        challenges: [],
        completed: 0,
        wins: 0
      };

      await performUpdate(uRef, updates);
    }

    return uRef;
  } catch (error) {
    console.error('getUserDocument Error:', error);
    return 'getUserDocument Error';
  }
};

export const getUser = async (UID) => {
  if (!UID) return null;

  try {
    const fRef = getRef('users', UID);
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
      const userUpdates = {
        friends: { ...{ [friendUID]: 1 }, ...uDoc.data().friends }
      };
      const friendUpdates = {
        friends: { ...{ [UID]: 1 }, ...fDoc.data().friends }
      };

      await Promise.all([
        performUpdate(uRef, userUpdates),
        performUpdate(fRef, friendUpdates)
      ]);

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
    if (Object.keys(field)[0] === 'displayName') {
      const updates = { displayName: field.displayName };
      await performUpdate(uRef, updates);

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
    let cRef = await firestore
      .collection('challenges')
      .add({ ...challenge, ...additionalData });

    const CUID = cRef.id;

    cRef = getRef('challenges', CUID);

    const cDoc = await cRef.get();

    let firstPlace = await getUser(auth.currentUser.uid);

    if (cDoc.data().CUID === '') {
      const updates = {
        CUID,
        members: { [auth.currentUser.uid]: { currentStreak: 0 } },
        memberCount: 1,
        firstPlace: firstPlace.displayName
      };
      await performUpdate(cRef, updates);

      return CUID;
    } else {
      return cRef;
    }
  } catch (error) {
    console.error('createChallengeProfileDocument Error:', error);
    return 'createChallengeProfileDocument Error';
  }
};

export const setUserChallenges = async (CUID, UID) => {
  if (!CUID || !UID) return;

  const uRef = getRef('users', UID);

  try {
    const uDoc = await uRef.get();
    const updates = { challenges: [CUID, ...uDoc.data().challenges] };
    await performUpdate(uRef, updates);

    return;
  } catch (error) {
    console.error('setUserChallenges Error:', error);
    return ' setUserChallenges Error';
  }
};

export const challengeAdjustMember = async (CUID, UID, additionalData) => {
  if (!CUID || !UID) return;

  try {
    const cRef = getRef('challenges', CUID);
    const cDoc = await cRef.get();

    if (cDoc.data().members[UID] === undefined) {
      const updates = {
        members: { ...{ [UID]: { currentStreak: 0 } }, ...cDoc.data().members },
        memberCount: cDoc.data().memberCount + 1
      };
      await performUpdate(cRef, updates);
    }

    return;
  } catch (error) {
    console.error('challengeAddNewMember Error:', error);
    return 'challengeAddNewMember Error';
  }
};

export const challengeCheckIn = async (CUID, UID) => {
  if (!CUID || !UID) return;

  const cRef = getRef('challenges', CUID);

  try {
    const cDoc = await cRef.get();

    const userCurrentStreak = cDoc.data().members[UID].currentStreak;
    const challengeDuration = parseInt(cDoc.data().duration);
    const allMembers = cDoc.data().members;

    var newStreak;
    var firstPlace;
    var firstPlaceStreaks = -1;

    for (let member of Object.keys(allMembers)) {
      if (allMembers[member].currentStreak > firstPlaceStreaks) {
        firstPlaceStreaks = allMembers[member].currentStreak;
        firstPlace = member;
      }
    }

    firstPlace = await getUser(firstPlace);

    if (userCurrentStreak < challengeDuration) {
      newStreak = userCurrentStreak + 1;
    } else {
      newStreak = userCurrentStreak;
    }

    const updates = {
      members: {
        ...cDoc.data().members,
        [UID]: { currentStreak: newStreak }
      },
      firstPlace: firstPlace.displayName
    };

    await performUpdate(cRef, updates);

    return;
  } catch (error) {
    console.error('challengeCheckIn Error:', error);
    return ' challengeCheckIn Error';
  }
};

//export default firebase;
