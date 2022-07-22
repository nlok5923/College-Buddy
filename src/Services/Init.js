import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';

export const initializeApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDN06Ty6p7YTPlOM8-FC0VARf0oJWKzjFQ",
            authDomain: "crypto-token-4e600.firebaseapp.com",
            projectId: "crypto-token-4e600",
            storageBucket: "crypto-token-4e600.appspot.com",
            messagingSenderId: "860981544578",
            appId: "1:860981544578:web:434c6e0167e973dd54169b"
        });
    }
};