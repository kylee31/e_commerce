// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence,getAuth } from "firebase/auth";
import { setPersistence } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCE6lGoxpaZP36GLSx9IhW_98cY29jTn_w",
    authDomain: "e-commerce-f517b.firebaseapp.com",
    projectId: "e-commerce-f517b",
    storageBucket: "e-commerce-f517b.appspot.com",
    messagingSenderId: "186882209743",
    appId: "1:186882209743:web:3faeb02e12d4245eb944ba",
    measurementId: "G-ZWLSZSG3X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
//TODO:이렇게 브라우저에 로그인 정보 저장하는게 맞나?
(async () => {
    await setPersistence(auth, browserLocalPersistence);
})();
//const analytics = getAnalytics(app);