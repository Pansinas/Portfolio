import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgA4tsBsRkp6h4fVRGHZaD52ymoyOhZC8",
  authDomain: "pansinportfolio.firebaseapp.com",
  projectId: "pansinportfolio",
  storageBucket: "pansinportfolio.firebasestorage.app",
  messagingSenderId: "28921060787",
  appId: "1:28921060787:web:6ca397b466ae3578fcffc6",
  measurementId: "G-J4S24RCLPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
