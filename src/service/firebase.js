// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGJc07QdqZjUY2cPgqyRnPyrnZkTEO8is",
  authDomain: "whatsapp-clone-56830.firebaseapp.com",
  projectId: "whatsapp-clone-56830",
  storageBucket: "whatsapp-clone-56830.appspot.com",
  messagingSenderId: "52596405706",
  appId: "1:52596405706:web:628255b2fc1602364d8b33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
