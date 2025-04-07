// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDY9o467LFW_x073OT9Ao9vaEQ4SIWpYpQ",
  authDomain: "tea-project-3a349.firebaseapp.com",
  projectId: "tea-project-3a349",
  storageBucket: "tea-project-3a349.firebasestorage.app",
  messagingSenderId: "750483220898",
  appId: "1:750483220898:web:fed7d86306a011edbb6afb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db };
