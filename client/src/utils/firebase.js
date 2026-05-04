import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-68c1a.firebaseapp.com",
  projectId: "interview-68c1a",
  storageBucket: "interview-68c1a.firebasestorage.app",
  messagingSenderId: "996167683339",
  appId: "1:996167683339:web:7d16ba43bc1c6eb490660e",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
