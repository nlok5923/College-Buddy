import * as React from "react";
import { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "../Services/Init";
import { CheckRole } from '../Services/CheckUser'

initializeApp();
const auth = firebase.auth();

export const UserContext = createContext({
  info: { user: null, isLoading: true, shippingAddress: "" },
});

const UserProvider = (props) => {
  const [info, setInfo] = useState({
    user: null,
    isLoading: true,
    shippingAddress: "",
  });
  useEffect(() => {
    auth.onAuthStateChanged(async (person) => {
      if (person) {
        console.log(person);
        const { displayName, email, uid } = person;
        const userRole = await CheckRole(uid);
        const role = userRole.role;
        setInfo({
          user: { displayName, email, uid, role},
          isLoading: false,
        });
      } else {
        setInfo({
          user: null,
          isLoading: false,
        });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;