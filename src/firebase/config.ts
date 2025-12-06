import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMvnPc7nAt2J6ReaAlSig3u3sWp2G_cjg",
  authDomain: "car-rental-pwa.firebaseapp.com",
  projectId: "car-rental-pwa",
  storageBucket: "car-rental-pwa.firebasestorage.app",
  messagingSenderId: "186132671058",
  appId: "1:186132671058:web:ac0ecef4e28fa5f8c04d8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
