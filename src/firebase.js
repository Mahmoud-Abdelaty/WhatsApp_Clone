import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTh-KWyEKvAME-4ppVvlmCar70aXJS2No",
  authDomain: "whatsapp-clone-2ca38.firebaseapp.com",
  projectId: "whatsapp-clone-2ca38",
  storageBucket: "whatsapp-clone-2ca38.appspot.com",
  messagingSenderId: "327706171265",
  appId: "1:327706171265:web:e71bda6d35fcdd7272ba80",
  measurementId: "G-XZ4PR7X7R1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

export const serverStamp = firebase.firestore.Timestamp;
