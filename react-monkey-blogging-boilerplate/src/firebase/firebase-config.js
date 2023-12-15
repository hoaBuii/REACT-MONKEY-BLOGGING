import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBX7H5terqIoVUe0-qXBFADxkp3MILxJYM",
  authDomain: "monkey-blogging-56bce.firebaseapp.com",
  projectId: "monkey-blogging-56bce",
  storageBucket: "monkey-blogging-56bce.appspot.com",
  messagingSenderId: "55792849175",
  appId: "1:55792849175:web:14de9d858831062b26e752",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
