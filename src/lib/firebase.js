// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-5f57e.firebaseapp.com",
  projectId: "reactchat-5f57e",
  storageBucket: "reactchat-5f57e.firebasestorage.app",
  messagingSenderId: "691707145550",
  appId: "1:691707145550:web:0d980389dd5a3c465bc21f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(); 