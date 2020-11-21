import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBlbOG09YwUbKnsE3kClp8pmwANOL3mrog",
  authDomain: "store-app-1-7e473.firebaseapp.com",
  databaseURL: "https://store-app-1-7e473.firebaseio.com",
  projectId: "store-app-1-7e473",
  storageBucket: "store-app-1-7e473.appspot.com",
  messagingSenderId: "970606579987",
  appId: "1:970606579987:web:465b8c6982dee7a5ef8ae6",
  measurementId: "G-RX7ZT1S7F6",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creacting user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
