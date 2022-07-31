// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxO75Y66CZyT8y061OEdQgt2lOXlo5PJU",
  authDomain: "post-51c91.firebaseapp.com",
  projectId: "post-51c91",
  storageBucket: "post-51c91.appspot.com",
  messagingSenderId: "1016967595270",
  appId: "1:1016967595270:web:5be1fb718c2cb9d75cca87",
  measurementId: "G-3LM69TYLTW"
};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const db = firebase.firestore()
