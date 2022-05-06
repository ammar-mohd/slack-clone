import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNYwAKso1eeJ_TnZJCJ-WPlGQbihP56jg",
  authDomain: "slack-clone-c0f4b.firebaseapp.com",
  projectId: "slack-clone-c0f4b",
  storageBucket: "slack-clone-c0f4b.appspot.com",
  messagingSenderId: "593250899158",
  appId: "1:593250899158:web:fe04ef69586e297e21e577",
  measurementId: "G-0XSTYP3LXJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
