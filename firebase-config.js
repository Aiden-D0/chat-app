const firebaseConfig = {
  apiKey: "AIzaSyAbgrezF6aYC1LTcVXsY7CFnJU6ex29-P8",
  authDomain: "webchatapp-4fbaf.firebaseapp.com",
  databaseURL: "https://webchatapp-4fbaf-default-rtdb.firebaseio.com", // ✅ THIS LINE IS REQUIRED
  projectId: "webchatapp-4fbaf",
  storageBucket: "webchatapp-4fbaf.appspot.com",
  messagingSenderId: "924513856351",
  appId: "1:924513856351:web:a8cf2542dbdde066f624ea",
  measurementId: "G-YYYRRQ0CYQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set up the Realtime Database
const db = firebase.database(); // ✅ Global variable used in script.js
