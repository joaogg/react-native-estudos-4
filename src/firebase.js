import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAzLJlEdsMjefcneqLdFm_-yWetE_Uvn9A",
    authDomain: "crud-fa7ee.firebaseapp.com",
    databaseURL: "https://crud-fa7ee.firebaseio.com",
    projectId: "crud-fa7ee",
    storageBucket: "crud-fa7ee.appspot.com",
    messagingSenderId: "954386397450",
    appId: "1:954386397450:web:dc0a41fe87353befb862f3",
    measurementId: "G-PWJPYJMQE3"
};

// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb;