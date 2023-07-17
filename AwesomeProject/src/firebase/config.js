import { initializeApp } from "firebase/app";
import "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDDER_ID,
//   APP_ID,
// } from "@env";

// // react-native-first-app
// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDDER_ID,
//   appId: APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAb7RE3oZr20tDUEkXlavuvkSebHJW0k3s",
  authDomain: "awesomeproject-5e1af.firebaseapp.com",
  //   databaseURL: "https://awesomeproject-5e1af-default-rtdb.firebaseio.com",
  projectId: "awesomeproject-5e1af",
  storageBucket: "awesomeproject-5e1af.appspot.com",
  messagingSenderId: "817345344815",
  appId: "1:817345344815:web:a5840edb3ae8575e5a9dda",
  //   measurementId: "G-ELHWWX8ZHW",
};

const app = initializeApp(firebaseConfig, "AwesomeProject");

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
