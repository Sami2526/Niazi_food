import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCmrQVI2pk37lD0qYAxH6WEvjSblwIT8FI",
  authDomain: "niazi-a234b.firebaseapp.com",
  databaseURL: "https://niazi-a234b-default-rtdb.firebaseio.com",
  projectId: "niazi-a234b",
  storageBucket: "niazi-a234b.firebasestorage.app",
  messagingSenderId: "750679309631",
  appId: "1:750679309631:web:35652b56b70648e304e78a",
  measurementId: "G-6D62MLYEE8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
