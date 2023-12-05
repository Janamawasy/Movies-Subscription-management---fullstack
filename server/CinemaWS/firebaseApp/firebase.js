const firebase = require('firebase/compat/app');
require('firebase/compat/firestore'); // Import the Firestore service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1MxDCMCOXujsuQsBzvnmZU5bDfryfPhU",
  authDomain: "movies-managment--proj1.firebaseapp.com",
  projectId: "movies-managment--proj1",
  storageBucket: "movies-managment--proj1.appspot.com",
  messagingSenderId: "816357760491",
  appId: "1:816357760491:web:d04b02d74a4b759ea50dae",
  measurementId: "G-9LW0RN695L"
};



// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// const firestore = app.firestore(); // Get the Firestore instance
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(); // Get the Firestore instance


module.exports = { firebase, firestore };