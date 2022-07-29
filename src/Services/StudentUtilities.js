import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';
import { getImageUrl } from './AdvertiserUtilities';

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

export const studentEnroll = async (uid, instId, streamId) => {
    await db.collection('users').doc(uid).update({
        instId: instId,
        streamId: streamId
    })
}

export const getStudent = async (uid) => {
    console.log(uid);
    let studentData = await db.collection('users').doc(uid).get();
    console.log(" this is student data ", studentData.data());
    return studentData.data();
}

export const submitAns = async (instId, streamId, courseId, _ans2, uid) => {
    console.log(" this is asn2 ", _ans2);
    try {
        await db.collection('users').doc(instId.trim()).collection('streams').doc(streamId.trim()).collection('courses').doc(courseId.trim()).collection('submission').add({
            ans2: _ans2,
            studentId: uid
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const fetchPost = async (instId) => {
    try {
        let data = [];
        console.log(" this is inst id ", instId);
        let ref = await db.collection('users').doc(instId.trim()).collection('advertisement').get();
        ref.forEach(async (doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                fileName: doc.data().fileName ? await getImageUrl("itemimage", doc.data().fileName) : "temp"
            })
        })
        return data;
    } catch(err) {
        console.log(err.message);
    }
} 

export const fetchEvent = async (instId) => {
    try {
        let data = [];
        console.log(" this is inst id ", instId);
        let ref = await db.collection('users').doc(instId.trim()).collection('event').get();
        ref.forEach(async (doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                link: doc.data().link,
                advtId: doc.data().advtId,
                dnt: doc.data().dnt || "No date and time"
            })
        })
        return data;
    } catch(err) {
        console.log(err.message);
    }
}

export const claims = async (advtid, poapData, _address) => {
    try {
        console.log(advtid + " " + poapData + " " + _address);
        await db.collection('users').doc(advtid).collection('claims').add({
            name: poapData.name,
            about: poapData.about,
            contribution: poapData.contribution,
            imageUrl: poapData.imageUrl,
            address: _address
        });
    } catch (err) {
        console.log(err.message);
    }
} 

export const getScore = async (uid) => {
    try {
        let data = await db.collection('users').doc(uid).get();
        return data.data().mark || 0;
    } catch (err) {
        console.log(err.message);
    }
}

export const getShare = async (uid) => {
    try {
        let ref = await db.collection('users').get();
        let sum = 0;
        let studentScore = 0;
        ref.forEach(async (doc) => {
            if(doc.data().role === "STD") {
                if(doc.data().mark) {
                    sum += parseInt(doc.data().mark);
                }

                if(doc.id === uid) {
                    studentScore = parseInt(doc.data().mark);
                }
            }
        });

        console.log(uid + " " + studentScore + " " + sum);
        return parseFloat(studentScore / sum);

    } catch (err) {
        console.log(err.message);
    }
}

export const removeScore = async (uid) => {
    try {
        await db.collection('users').doc(uid).update({
            mark: 0
        });
    } catch (err) {
        console.log(err.message);
    }
}