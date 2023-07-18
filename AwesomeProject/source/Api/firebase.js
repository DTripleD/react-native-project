import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb7RE3oZr20tDUEkXlavuvkSebHJW0k3s",
  authDomain: "awesomeproject-5e1af.firebaseapp.com",
  projectId: "awesomeproject-5e1af",
  storageBucket: "awesomeproject-5e1af.appspot.com",
  messagingSenderId: "817345344815",
  appId: "1:817345344815:web:a5840edb3ae8575e5a9dda",
};

// Initialize Firebas
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
