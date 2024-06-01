const firebase = require('firebase/compat/app');
require('firebase/compat/firestore'); // Import the Firestore service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};



// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// const firestore = app.firestore(); // Get the Firestore instance
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(); // Get the Firestore instance


module.exports = { firebase, firestore };
