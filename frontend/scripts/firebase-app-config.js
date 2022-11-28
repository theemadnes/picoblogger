// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJOHFB_DJambfxpZ65JIXTeu_ZQmdQ-Vw",
    authDomain: "am-arg-01.firebaseapp.com",
    projectId: "am-arg-01",
    storageBucket: "am-arg-01.appspot.com",
    messagingSenderId: "841101411908",
    appId: "1:841101411908:web:b67282c22817782f895e11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    //fbAuthContainer = document.getElementById('firebaseui-auth-container');
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("logged in");
      document.getElementById('loginLink').textContent = "sign out";
      document.getElementById('firebaseui-auth-container').hidden = true;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("not logged in");
      document.getElementById('loginLink').textContent = "sign in";
      document.getElementById('firebaseui-auth-container').hidden = false;
    }
  });
//console.log(app);
//console.log(auth);
window.app = app;
window.auth = auth;