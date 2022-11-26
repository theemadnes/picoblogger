// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
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
const app = initializeApp(firebaseConfig);
console.log(app);