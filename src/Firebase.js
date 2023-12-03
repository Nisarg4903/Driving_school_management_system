// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "mid-term-8e76c.firebaseapp.com",
  projectId: "mid-term-8e76c",
  storageBucket: "mid-term-8e76c.appspot.com",
  messagingSenderId: "514154904661",
  appId: "1:514154904661:web:57ab847f421b1f551828dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication instance
export const Auth = getAuth();
