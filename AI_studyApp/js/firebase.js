import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBK-KfHlww6YQIoWuDsaOPXjIjcqtIkwbw",
    authDomain: "agent-alex-2f6b0.firebaseapp.com",
    projectId: "agent-alex-2f6b0",
    storageBucket: "agent-alex-2f6b0.firebasestorage.app",
    messagingSenderId: "1004423328241",
    appId: "1:1004423328241:web:8fc2ec6bdf5604db4f5450",
    measurementId: "G-KRQECP8964"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function loginWithGoogle() {
    return signInWithPopup(auth, provider);
}

export function logoutUser() {
    return signOut(auth);
}

export function watchAuthState(callback) {
    onAuthStateChanged(auth, callback);
}