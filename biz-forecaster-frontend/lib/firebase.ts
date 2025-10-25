import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxp6vs4Arb4YZgg5RGuA01rJWL8D45H5w",
  authDomain: "business-forecaster-dc31f.firebaseapp.com",
  projectId: "business-forecaster-dc31f",
  storageBucket: "business-forecaster-dc31f.appspot.com",
  messagingSenderId: "1046713946953",
  appId: "1:1046713946953:web:54d3570e6e6ae2b98dc098",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
