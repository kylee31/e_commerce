// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence,getAuth } from "firebase/auth";
import { setPersistence } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApiKey=import.meta.env.VITE_APP_FIREBASE_API_KEY;
const firebasaeAuthDomain=import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId=import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const firebaseStorageBucket=import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;
const firebaseMessaginSenderId=import.meta.env.VITET_APP_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId=import.meta.env.VITE_APP_FIREBASE_APP_ID;
const firebaseMeasuermentId=import.meta.env.VITE_APP_FIREBASE_MESUERMENT_ID

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebasaeAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessaginSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasuermentId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
(async () => {
    await setPersistence(auth, browserLocalPersistence);
})();
//const analytics = getAnalytics(app);