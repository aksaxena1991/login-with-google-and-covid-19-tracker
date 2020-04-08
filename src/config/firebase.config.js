import firebase from 'firebase';
import 'firebase';
const firebaseInstance = firebase.initializeApp({
    apiKey: "AIzaSyAgQetVokq4SCHyAsf-fEjTRxqPwRReaIs",
    authDomain: "tracker-covid-19.firebaseapp.com",
    databaseURL: "https://tracker-covid-19.firebaseio.com",
    projectId: "tracker-covid-19",
    storageBucket: "tracker-covid-19.appspot.com",
    messagingSenderId: "950603255793",
    appId: "1:950603255793:web:e574713bbff666ab1ebe50",
    measurementId: "G-D9S4PX2GEX"
});

export default firebaseInstance;