const firebase = require('firebase/app');
 
const config = {
    apiKey: "AIzaSyB6d557V-lUNBHcGoNTYFQwSOQ095Ua3CE",
    authDomain: "eportfolio-4760f.firebaseapp.com",
    databaseURL: "https://eportfolio-4760f.firebaseio.com",
    projectId: "eportfolio-4760f",
    storageBucket: "eportfolio-4760f.appspot.com",
    messagingSenderId: "358270939228",
    appId: "1:358270939228:web:63ce0b3ae213c8adc5f699",
    measurementId: "G-PHNTXS2HKP"
};


const InitFirebase = () => {
    if (firebase.apps.length === 0) {
        return (
            firebase.initializeApp(config)
        );
    }
  }
  export default InitFirebase;