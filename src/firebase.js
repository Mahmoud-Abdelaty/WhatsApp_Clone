import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtrHO6pKhgvYlcZBOPa8AsCkSa8xC_zyk",
  authDomain: "whatsapp-clone-8f994.firebaseapp.com",
  projectId: "whatsapp-clone-8f994",
  storageBucket: "whatsapp-clone-8f994.appspot.com",
  messagingSenderId: "1086482323936",
  appId: "1:1086482323936:web:780dc5bf43a2f30f20b385",
  measurementId: "G-6S8PJP95VJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
