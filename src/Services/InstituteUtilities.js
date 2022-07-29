import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';
import { handleUpload, getFileName, getImageUrl } from './AdvertiserUtilities'

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

export const AddCourses = async (uid, streamId, _name, image) => {
    console.log(uid + " " + streamId + " " + _name + " " + image);
    let fileName = getFileName();
    if (image) {
        await handleUpload(image, fileName, "itemimage");
    }
    let fileUrl = await getImageUrl("itemimage", fileName);
    console.log(" this is file url ", fileUrl);
    let data = await db.collection('users').doc(uid).collection('streams').doc(streamId).collection('courses').add({
        name: _name,
        code: fileUrl
    });
    console.log(data.id);
}

export const fetchCourses = async (uid, streamId) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').get();
        ref.forEach(async (doc) => {
            let subRef = await db.collection('users').doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').doc(doc.id).collection('submission').get();
            let isSubmitted = false;
            console.log(uid)
            subRef.forEach((subDoc) => {
                if(subDoc.data().studentId === uid.trim()) {
                    isSubmitted = true;
                    console.log("matched ", subDoc.data().studentId);
                }
                console.log("other id ", subDoc.data().studentId);
            })
            console.log("this is isbumit ", isSubmitted);

            if(!isSubmitted) {
                data.push({
                    id: doc.id,
                    name: doc.data().name,
                    code: doc.data().code
                })
            }
        })
        console.log(" these are all courses ", data);
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all blogs");
    }
}

export const fetchStudentCourses = async (uid, streamId, stdId) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').get();
        ref.forEach(async (doc) => {
            let subRef = await db.collection('users').doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').doc(doc.id).collection('submission').get();
            let isSubmitted = false;
            console.log(uid)
            subRef.forEach((subDoc) => {
                if(subDoc.data().studentId === stdId.trim()) {
                    isSubmitted = true;
                    console.log("matched ", subDoc.data().studentId);
                }
                console.log("other id ", subDoc.data().studentId);
            })
            console.log("this is isbumit ", isSubmitted);

            if(!isSubmitted) {
                data.push({
                    id: doc.id,
                    name: doc.data().name,
                    code: doc.data().code
                })
            }
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
                ans2: doc.data().ans2,
                studentId: doc.data().studentId,
                marked: doc.data().marked ? doc.data().marked : false
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
        console.log(uid + " " + streamId + " " + courseId + " " + subId + " " + _mark + " " + stdId);
        await db.collection('users').doc(uid).collection('streams').doc(streamId).collection('courses').doc(courseId).collection('submission').doc(subId).update({
            mark: _mark,
            marked: true
        })
        let doc = await db.collection('users').doc(stdId).get();
        let oldMark = doc.data().mark || 0;
        await db.collection('users').doc(stdId).update({
            mark: String(parseInt(parseInt(oldMark) + parseInt(_mark)))            
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