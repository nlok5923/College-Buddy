import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';

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

const db = firebase.firestore();

export const AddStreams = async (uid, name, description) => {
    console.log("Adding stream ", uid, " ", name, " ", description);
    await db.collection('users').doc(uid).collection('streams').add({
        name,
        description
    });
}

export const AddCourses = async (uid, streamId, name, code, description) => {
    console.log(uid + " " + streamId + " " + name + " " + code + " "+ description);
    let data = await db.collection('users').doc(uid).collection('streams').doc(streamId).collection('courses').add({
        name,
        code,
        description
    });
    console.log(data.id);
}

export const fetchCourses = async (uid, streamId) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid).collection('streams').doc(streamId).collection('courses').get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                code: doc.data().code
            })
        })
        console.log(" these are all courses ", data);
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all blogs");
    }
}

export const fetchStreams = async (uid) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid).collection('streams').get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
            })
        })
        console.log(" these are all stream ", data);
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all blogs");
    }
}
