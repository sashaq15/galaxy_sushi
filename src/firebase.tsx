import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKCV_6TRQilDFSXG-6PEv9WJsgN0grVJI",
  authDomain: "react-firebase-auth-c7697.firebaseapp.com",
  projectId: "react-firebase-auth-c7697",
  storageBucket: "react-firebase-auth-c7697.firebasestorage.app",
  messagingSenderId: "387149431091",
  appId: "1:387149431091:web:8ed34b4b6fd03bb92a3e46",
  measurementId: "G-9PZXSHRR7Q"
}

const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);
export const createUser = async(email:string, password:string) => {
    return createUserWithEmailAndPassword(getAuth(app), email,password)
  }
  
  export const signInUser = async(email:string, password:string) => {
    return signInWithEmailAndPassword(getAuth(app), email, password )
  }



