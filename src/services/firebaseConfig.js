// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkKfnMBWUa6l8wyge2Z4f2GLyWjMZvmko",
  authDomain: "energydashboard-6a822.firebaseapp.com",
  databaseURL: "https://energydashboard-6a822-default-rtdb.firebaseio.com",
  projectId: "energydashboard-6a822",
  storageBucket: "energydashboard-6a822.firebasestorage.app",
  messagingSenderId: "643472899312",
  appId: "1:643472899312:web:b9cf761d2c33a4786d5635",
  measurementId: "G-QYGZJLD467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Realtime Database
export const database = getDatabase(app);