// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";  // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY9o467LFW_x073OT9Ao9vaEQ4SIWpYpQ",
  authDomain: "tea-project-3a349.firebaseapp.com",
  projectId: "tea-project-3a349",
  storageBucket: "tea-project-3a349.firebasestorage.app",
  messagingSenderId: "750483220898",
  appId: "1:750483220898:web:fed7d86306a011edbb6afb"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized
}

// Firestore instance
const db = firebase.firestore(); 

export { db };  // Export Firestore for use in other files
