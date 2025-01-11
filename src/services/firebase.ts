import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWFEK-fwHKbLfn9eIOAfilbZxos5AfJ1Q",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "matching-app-2-9f7c9",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
