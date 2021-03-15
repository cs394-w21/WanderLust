import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  // Fill this in with your API values! You should be able to copy-paste from the Firebase
  // console.
  // apiKey: ,
  // authDomain: ,
  // databaseURL: ,
  // projectId: ,
  // storageBucket: ,
  // messagingSenderId ,
  // appId: ,
  // measurementId: ,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
