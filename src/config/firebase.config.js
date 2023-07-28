// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, getDoc, collection} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwqRcqMY9Rp2QEaJL4X581BPQE1eOpeBQ",
  authDomain: "myportfolio-e3f10.firebaseapp.com",
  databaseURL: "https://myportfolio-e3f10-default-rtdb.firebaseio.com",
  projectId: "myportfolio-e3f10",
  storageBucket: "myportfolio-e3f10.appspot.com",
  messagingSenderId: "238033549059",
  appId: "1:238033549059:web:9e200f8ea72db3440a9b36",
  measurementId: "G-ZHT9CE80YV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
// const db = getFire