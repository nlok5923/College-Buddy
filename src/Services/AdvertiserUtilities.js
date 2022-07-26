import 'firebase/auth';
import firebase from 'firebase/app';
import '@firebase/database';
import "@firebase/storage";
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

export const fetchInstitutes = async () => {
    try {
        let data = [];
        let ref = await db.collection("users").get();
        ref.forEach((doc) => {
            console.log("doc", doc.data());
            if(doc.data().role === "INST") {
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


 const handleUpload = async (image, fileName, folderName) => {
    await firebase
      .storage()
      .ref(`${folderName}/${fileName}`)
      .put(image);
  };
  
  const getFileName = () => {
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

export const addPost = async (uid, name, description, fileLocation) => {
    console.log(uid + " " + name + " " + description + " " + fileLocation);
    try {
        let fileName = getFileName();
        if(fileLocation) {
            await handleUpload(fileLocation, fileName, "itemimage");
        }
        await db.collection('users').doc(uid).collection("advertisement").add({
            name,
            description,
            fileName
        });
    } catch(err) {
        console.log(err.message);
    }
}

export const addModule = async (instId, _q1, _q2) => {
    try {
        await db.collection('users').doc(instId).collection('module').add({
            q1: _q1,
            q2: _q2
        })
    } catch(err) {
        console.log(err.message);
    }
}