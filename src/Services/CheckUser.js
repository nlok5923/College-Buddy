import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGID,
        appId: process.env.REACT_APP_APPID
    });
}

const db = firebase.firestore();

export const CheckRole = async (uid) => {
    const res = await db.collection('users').doc(uid).get();
    console.log(" this is resp from firebase ", res.data());
    return res.data();
}
