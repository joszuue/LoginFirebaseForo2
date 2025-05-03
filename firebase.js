// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA35ZM6D_OnWj_wsZCiKQml5-WFKm8VNQQ",
    authDomain: "login-foro-2-dps.firebaseapp.com",
    projectId: "login-foro-2-dps",
    storageBucket: "login-foro-2-dps.firebasestorage.app",
    messagingSenderId: "1079201234083",
    appId: "1:1079201234083:web:5fd1ac6eba7667a1fd5316",
    measurementId: "G-2Z66EEFJTV"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth
export const auth = getAuth(app);
