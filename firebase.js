import * as firebase from "firebase"
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASx0lZcUGXtvQ1ITqjF_oyk56L7-oD8tU",
    authDomain: "quiz-project-8fc99.firebaseapp.com",
    projectId: "quiz-project-8fc99",
    storageBucket: "quiz-project-8fc99.appspot.com",
    messagingSenderId: "222999629188",
    appId: "1:222999629188:web:3f1d161d6413cb581ca1d1"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };