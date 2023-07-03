import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeAuth } from "firebase/auth";

import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAb7RE3oZr20tDUEkXlavuvkSebHJW0k3s",
  authDomain: "awesomeproject-5e1af.firebaseapp.com",
  databaseURL: "https://awesomeproject-5e1af-default-rtdb.firebaseio.com",
  projectId: "awesomeproject-5e1af",
  storageBucket: "awesomeproject-5e1af.appspot.com",
  messagingSenderId: "817345344815",
  appId: "1:817345344815:web:a5840edb3ae8575e5a9dda",
  measurementId: "G-ELHWWX8ZHW",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
