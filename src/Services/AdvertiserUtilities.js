import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import "@firebase/storage";
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

// REACT_APP_APIKEY=AIzaSyDN06Ty6p7YTPlOM8-FC0VARf0oJWKzjFQ
// REACT_APP_AUTHDOMAIN=crypto-token-4e600.firebaseapp.com
// REACT_APP_PROJECTID=crypto-token-4e600
// REACT_APP_STORAGEBUCKET=crypto-token-4e600.appspot.com
// REACT_APP_MESSAGINGID=860981544578
// REACT_APP_APPID=1:860981544578:web:434c6e0167e973dd54169b

const db = firebase.firestore();

export const fetchInstitutes = async () => {
    try {
        let data = [];
        let ref = await db.collection("users").get();
        ref.forEach((doc) => {
            console.log("doc", doc.data());
            if (doc.data().role === "INST") {
                data.push({
                    id: doc.id,
                    name: doc.data().name || "temp",
                    description: doc.data().description || "temp",
                })
            }
        })
        console.log(" these are all stream ", data);
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all blogs");
    }
}


export const handleUpload = async (image, fileName, folderName) => {
    await firebase
        .storage()
        .ref(`${folderName}/${fileName}`)
        .put(image);
};

export const getFileName = () => {
    let fileName =
        String(Date.now()) +
        parseInt(Math.random() * 10) +
        parseInt(Math.random() * 10) +
        parseInt(Math.random() * 10);
    return fileName;
};

export const getImageUrl = async (folderName, fileName) => {
    let url = await firebase
        .storage()
        .ref(folderName)
        .child(fileName)
        .getDownloadURL();
    return url;
};

export const addPost = async (uid, name, description, fileLocation, advtId) => {
    console.log(uid + " " + name + " " + description + " " + fileLocation);
    try {
        let fileName = getFileName();
        if (fileLocation) {
            await handleUpload(fileLocation, fileName, "itemimage");
        }
        await db.collection('users').doc(uid).collection("advertisement").add({
            name,
            description,
            fileName,
            advtId
        });
    } catch (err) {
        console.log(err.message);
    }
}

export const uploadPoapImage = async (location) => {
    try {
        let fileName = getFileName();
        await handleUpload(location, fileName, "itemimage");
        return fileName;
    } catch (err) {
        console.log(err.message);
    }
}

export const addModule = async (instId, _moduleQuestions, _advtId, _name) => {
    try {
        console.log(' this is module questions ', _moduleQuestions);
        let moduleQuestions = _moduleQuestions.map((data) => data.q);
        await db.collection('users').doc(instId).collection('module').add({
            questions: moduleQuestions, 
            advtId: _advtId,
            name: _name
        });
    } catch (err) {
        console.log(err.message);
    }
}

export const addEvent = async (instId, _name, _description, _link, _advtId, _dnt, eventImageUrl) => {
    console.log(instId + " " + _name + " " + _description + " " + _link + " " + _advtId);
    try {
        await db.collection('users').doc(instId).collection('event').add({
            name: _name,
            description: _description,
            link: _link,
            advtId: _advtId,
            dnt: _dnt,
            url: eventImageUrl
        });
    } catch (err) {
        console.log(err.message);
    }
}

export const getAllClaims = async (uid) => {
    try {
        let data = [];
        let ref = await db.collection("users").doc(uid).collection('claims').get();
        ref.forEach((doc) => {
            console.log("doc", doc.data());
            data.push({
                id: doc.id,
                name: doc.data().name || "temp",
                about: doc.data().about || "temp",
                link: doc.data().link,
                address: doc.data().address,
                imageUrl: doc.data().imageUrl,
                contribution: doc.data().contribution,
                claimed: doc.data().claimed || false                
            })
        })
        console.log(" these are all stream ", data);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

export const PoapClaimed = async (advtId, claimId) => {
    try {
        await db.collection('users').doc(advtId).collection('claims').doc(claimId).update({
            claimed: true
        });
    } catch(err) {
        console.log(err.message);
    }
}

export const getInstituteData = async (uid) => {
    try {
        let data = await db.collection('users').doc(uid).get();
        return {
            displayName: data.data().name || "dummy",
            about: data.data().description
        }
    } catch (err) {
        console.log(err.message);
    }
}

export const getALlModuleResponses = async (uid) => {
    try {
         let responses = [];
         let instituteRef = await db.collection('users').get();
         let instituteId = [];
         instituteRef.forEach((doc, id) => instituteId.push(doc.id));
         for (let instid of instituteId) {
            let moduleRef = await db.collection('users').doc(instid).collection('module').get();
            moduleRef.forEach(async (moduleDoc, moduleId) => {
                let tempResponse = [];
                if(moduleDoc.data().advtId === uid) {
                    let responseRef = await db.collection('users').doc(instid).collection('module').doc(moduleDoc.id).collection('response').get();
                    responseRef.forEach((responseDoc, responseId) => {
                        tempResponse.push({
                            id: responseDoc.id,
                            answers: responseDoc.data().answers,
                        })
                    })
                    responses.push({
                        name: moduleDoc.data().name || "dummy",
                        responses: tempResponse
                    });
                }
            })
         }
        //  instituteRef.forEach(async (doc, id) => {
        //     let moduleRef = await db.collection('users').doc(doc.id).collection('module').get();
        //     moduleRef.forEach(async (moduleDoc, moduleId) => {
        //         let tempResponse = [];
        //         if(moduleDoc.data().advtId === uid) {
        //             let responseRef = await db.collection('users').doc(doc.id).collection('module').doc(moduleDoc.id).collection('response').get();
        //             responseRef.forEach((responseDoc, responseId) => {
        //                 tempResponse.push({
        //                     id: responseDoc.id,
        //                     ans1: responseDoc.data().q1,
        //                     ans2: responseDoc.data().q2 
        //                 })
        //             })
        //             responses.push({
        //                 name: moduleDoc.data().name || "dummy",
        //                 responses: tempResponse
        //             });
        //         }
        //     })
        //  });
         return responses;
    } catch (err) {
        console.log(err.message);
    }
}