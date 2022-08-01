import "firebase/auth";
import { initializeApp } from "./Init";
import firebase from "firebase/app";
import "@firebase/database";
import "firebase/firestore";
import { useMoralis } from "react-moralis"
initializeApp();
// const { authenticate, isAuthenticated, user } = useMoralis();    
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// var user;
const db = firebase.firestore();

const saveUser = async ({ email, uid, displayName }, role) => {
  if(role === "STD") {
    const savingRes = await db.collection("users").doc(uid).set({
      displayName,
      email,
      role,
      instId: "",
      streamId: ""
    });
    console.log(savingRes);
  } else if(role === "INST") {
    const savingRes = await db.collection("users").doc(uid).set({
      displayName,
      email,
      role,
      name: "",
      description: ""
    });
    console.log(savingRes);
  } else {
    const savingRes = await db.collection("users").doc(uid).set({
      displayName,
      email,
      role
    });
    console.log(savingRes);
  }
};

export const SignInWithGoogle = (role) => {
  auth
    .signInWithPopup(provider)
    .then((result) => {

      if (result.additionalUserInfo.isNewUser) {
        // user = result.user;
        return saveUser(result.user, role);
      } 
      return true;
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  //  try {
    
  //  } catch (err) {
  //   console.log(err.message);
  //  }
};

export const SignInWithMoralis = async (userId, role) => {
  try {
    let isUserResp = await isUser(userId);
    console.log(" is user resp ", isUserResp);
    if(!isUserResp) {
      console.log(" this is called and isUserResp ", userId + " " + isUserResp);
      await saveUser({email: "tempmail", uid: userId, displayName: "name"}, role);
    }
  } catch (err) {
    console.log(err);
  }
}

export const isUser = async (id) => {
  const userRef = await db.collection("users").doc(id).get();
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