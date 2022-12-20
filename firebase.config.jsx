// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ-ri5Jzb97HWW9f3R1rQDzF3Y1JZkDZk",
  authDomain: "senior-project-9f7d7.firebaseapp.com",
  databaseURL: "https://senior-project-9f7d7-default-rtdb.firebaseio.com",
  projectId: "senior-project-9f7d7",
  storageBucket: "senior-project-9f7d7.appspot.com",
  messagingSenderId: "888880200481",
  appId: "1:888880200481:web:f7bb0d5ede7ba6454fdc60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
export const db = getDatabase(app);

// Initialilze Authentication
export const auth = getAuth(app);

// Initialize Google
export const provider = new GoogleAuthProvider(app);
