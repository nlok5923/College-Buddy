import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';

export const initializeApp = () => {
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
};