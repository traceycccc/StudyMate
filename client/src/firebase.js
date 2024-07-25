// src/firebase.js
// import firebase from "firebase/app";
// import "firebase/auth";


// const firebaseConfig = {
//     apiKey: "AIzaSyAO6KzhbXJnJcEf0-_1Ut4xNSEYiF-O3G4",
//     authDomain: "studymate-ece7f.firebaseapp.com",
//     projectId: "studymate-ece7f",
//     storageBucket: "studymate-ece7f.appspot.com",
//     messagingSenderId: "1065989052032",
//     appId: "1:1065989052032:web:76df34e8713577fe153865",
//     measurementId: "G-3J6EP3476E"
// };
// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export default firebase;


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAO6KzhbXJnJcEf0-_1Ut4xNSEYiF-O3G4",
    authDomain: "studymate-ece7f.firebaseapp.com",
    projectId: "studymate-ece7f",
    storageBucket: "studymate-ece7f.appspot.com",
    messagingSenderId: "1065989052032",
    appId: "1:1065989052032:web:76df34e8713577fe153865",
    measurementId: "G-3J6EP3476E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
