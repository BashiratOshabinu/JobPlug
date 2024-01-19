// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApcXBS_fF003EXTemkmmPQc8S9fuTmRac",
  authDomain: "jobplug-a503f.firebaseapp.com",
  projectId: "jobplug-a503f",
  storageBucket: "jobplug-a503f.appspot.com",
  messagingSenderId: "230706538101",
  appId: "1:230706538101:web:8551739a0541c9e46a7a3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenthication = getAuth(app)
export const db = getFirestore(app)