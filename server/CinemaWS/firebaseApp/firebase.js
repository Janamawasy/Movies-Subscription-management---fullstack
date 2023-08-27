const firebase = require('firebase/compat/app');
require('firebase/compat/firestore'); // Import the Firestore service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxxxxx",
  authDomain: "xxxxxxx",
  projectId: "xxxxxxx",
  storageBucket: "xxxxxxxxx",
  messagingSenderId: "xxxxxxxxxx",
  appId: "xxxxxxxxxxxxxx"
};


// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// const firestore = app.firestore(); // Get the Firestore instance
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(); // Get the Firestore instance


module.exports = { firebase, firestore };