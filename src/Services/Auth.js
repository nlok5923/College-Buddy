import "firebase/auth";
import { initializeApp } from "./Init";
import firebase from "firebase/app";
import "@firebase/database";
import "firebase/firestore";

initializeApp();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
var user;
const db = firebase.firestore();

const saveUser = async ({ email, uid, displayName }, role) => {
  console.log("this is role ", role);
  await db.collection("users").doc(uid).set({
    displayName,
    email,
    role: role,
  });
};

export const SignInWithGoogle = (role) => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        user = result.user;
        saveUser(user, role);
      }

      return true;
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const isUser = async (id) => {
  const userRef = await db.collection("user").doc(id).get();
  return userRef.exists;
};

export const signOut = () => {
  initializeApp();
  firebase
    .auth()
    .signOut()
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};