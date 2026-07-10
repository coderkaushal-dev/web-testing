// js/firebase-config.js

const firebaseConfig = { 
    apiKey: "AIzaSyBgKbi7U1F_wMflgf8-SiX97X_f06hB6Io",
    authDomain: "mylinkhub-ea198.firebaseapp.com", 
    projectId: "mylinkhub-ea198", 
    storageBucket: "mylinkhub-ea198.firebasestorage.app", 
    messagingSenderId: "127986959992",
    appId: "1:127986959992:web:60b3d604c0187211264f8d"
};

// Initialize Firebase (Compat Version for Vanilla JS)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();