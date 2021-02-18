import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAybzs--wTk2_dOg9BaIO9IbEWPpCtlkCQ",
  authDomain: "wanderlust-708c7.firebaseapp.com",
  databaseURL: "https://wanderlust-708c7-default-rtdb.firebaseio.com",
  projectId: "wanderlust-708c7",
  storageBucket: "wanderlust-708c7.appspot.com",
  messagingSenderId: "141923669248",
  appId: "1:141923669248:web:07aba2941c67e421744fe5",
  measurementId: "G-5P5QCE98J7",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
