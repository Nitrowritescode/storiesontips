// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-story-generator-e98fa.firebaseapp.com",
  projectId: "ai-story-generator-e98fa",
  storageBucket: "ai-story-generator-e98fa.firebasestorage.app",
  messagingSenderId: "540134129894",
  appId: "1:540134129894:web:256363210faaeaa035bb27",
  measurementId: "G-V62QTWTMVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
