const firebase = require('firebase/app');
 
const config = {
    apiKey: "AIzaSyAMd8gkIHRmQk5b7HKgONyfPQkq_kG9EOs",
    authDomain: "tech-pirates-portfolio-web-app.firebaseapp.com",
    databaseURL: "https://tech-pirates-portfolio-web-app.firebaseio.com",
    projectId: "tech-pirates-portfolio-web-app",
    storageBucket: "tech-pirates-portfolio-web-app.appspot.com",
    messagingSenderId: "757059604167",
    appId: "1:757059604167:web:3d85472269b7104b4cf8e2",
    measurementId: "G-QG4ZZ4M0H4",
};


const InitFirebase = () => {
    if (firebase.apps.length === 0) {
        return (
            firebase.initializeApp(config)
        );
    }
  }
  export default InitFirebase;