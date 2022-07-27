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
    });
    console.log(data.id);
}

export const fetchCourses = async (uid, streamId) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').get();
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

export const updateInstitute = async (uid, _name, _description) => {
    try {
        await db.collection('users').doc(uid).update({
            name: _name,
            description: _description
        })
    } catch(err) {
        console.log(err.message);
    }
}

export const getSubmission = async (uid, streamId, courseId) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').doc(courseId.trim()).collection('submission').get()
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                ans1: doc.data().ans1,
                ans2: doc.data().ans2,
                studentId: doc.data().studentId
            })
        })
        console.log(" these are all stream ", data);
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all blogs");
    }
}

export const setMark = async (uid, streamId, courseId, subId, _mark, stdId) => {
    try {
        await db.collection('users').doc(uid).collection('streams').doc(streamId).collection('courses').doc(courseId).collection('submission').doc(subId).update({
            mark: _mark
        })
        let doc = await db.collection('users').doc(stdId).get();
        let oldMark = doc.data().mark;
        await db.collection('users').doc(stdId).update({
            mark: oldMark + _mark            
        });
    } catch(err) {
        console.log(err.message);
    }
}

export const getInstitute = async (uid) => {
    try {
        let data = await db.collection('users').doc(uid).get();
        if(data.data().name || data.data().description) return true;
        return false;
    } catch(err) {
        console.log(err.message);
    }
}

export const getModules = async (instId) => {
    try {
        let data = [];
        let ref = await db.collection('users').doc(instId).collection('module').get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                q1: doc.data().q1,
                q2: doc.data().q2,
            })
        })
        return data;
    } catch(err) {
        console.log(err.message);
    }
}