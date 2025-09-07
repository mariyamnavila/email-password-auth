// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCA2NinXbSDzwdqPHNL6m3anm1SfMP-W8",
  authDomain: "email-password-auth-59c98.firebaseapp.com",
  projectId: "email-password-auth-59c98",
  storageBucket: "email-password-auth-59c98.firebasestorage.app",
  messagingSenderId: "201303475080",
  appId: "1:201303475080:web:fa294aaf75371b73dd303d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth