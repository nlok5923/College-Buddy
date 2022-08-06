import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/firestore';
import { handleUpload, getFileName, getImageUrl } from './AdvertiserUtilities'

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
        console.log("finnaly ye to aarray hona chahiye ", typeof data)
        let ref = await db.collection("users").doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').get();
        console.log("this is ref size and ref", ref.size);
        ref.forEach(async (doc) => {
                data.push({
                    id: doc.id,
                    name: doc.data().name,
                    code: doc.data().code
                })
        })

        console.log("before loop ", data);
        let finalData = [];
        for(let doc = 0; doc < data.length; doc++ ) {
            let subRef = await db.collection('users').doc(uid.trim()).collection('streams').doc(streamId.trim()).collection('courses').doc(data[doc].id).collection('submission').get();
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
                // console.log("reached here and doc", doc.data().name);
                finalData.push({
                    id: data[doc].id,
                    name: data[doc].name,
                    code: data[doc].code
                })
                console.log("thisis type as well ", data)
            }
        }
        console.log(" these are all courses ", finalData);
        return finalData;
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

export const getModules = async (instId, studentId) => {
    try {
        let data = [];
        let ref = await db.collection('users').doc(instId).collection('module').get();
        ref.forEach(async (doc) => {
            let moduleId = doc.id;
            console.log(" this is module ",doc.data());
            let moduleRef = await db.collection('users').doc(instId).collection('module').doc(moduleId).collection('response').get();
            let isPresent = false;

            moduleRef.forEach((data, id) => {
                if(data.data().stdId === studentId) { isPresent = true; }
            })

            if(!isPresent) {
                data.push({
                    id: doc.id,
                    questions: doc.data().questions,
                    name: doc.data().name
                })
            }
        })
        return data;
    } catch(err) {
        console.log(err.message);
    }
}

export const deleteAssignment = async (instId, streamId, assignmentId) => {
    try {
        await db.collection('users').doc(instId).collection('streams').doc(streamId).collection('courses').doc(assignmentId).delete();
    } catch (err) {
        console.log(err.message);
    }
}

export const deleteBranch = async (instId, streamId) => {
    try {
        console.log(" this is inst id and stream id ", instId + "  " + streamId);
        await db.collection('users').doc(instId).collection('streams').doc(streamId).delete();
    } catch (err) {
        console.log(err.message);
    }
}