// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseAPI } from "./APIkeys.key.js";
import 'firebase/compat/storage';
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPI.apiKey,
  authDomain: firebaseAPI.authDomain,
  projectId: firebaseAPI.projectId,
  storageBucket: firebaseAPI.storageBucket,
  messagingSenderId: firebaseAPI.messagingSenderId,
  appId: firebaseAPI.appId
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const imgStorage = firebase.storage;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenthication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);