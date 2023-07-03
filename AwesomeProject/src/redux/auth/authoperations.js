import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../../FireBase";

import {
  saveUserProfile,
  stateChangeUser,
  logOutUser,
  updateUserPhoto,
} from "./authSlice";
// REGISTR
const authSignUp =
  ({ email, password, name, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      }).then(() => console.log("Updated"));

      const { displayName, uid, photoURL } = auth.currentUser;

      dispatch(saveUserProfile({ displayName, uid, email, photoURL }));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
// LOGIN
const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        ({ user }) => {
          const { displayName, uid, email, photoURL } = user;
          dispatch(saveUserProfile({ displayName, uid, email, photoURL }));
        }
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
// LOGOUT
const authSignOut = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(logOutUser());
};

// REFRESH
const authStateChanged = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, uid, email, photoURL } = user;

        dispatch(saveUserProfile({ displayName, uid, email, photoURL }));
        dispatch(stateChangeUser(true));
      }
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const authUpdateProfile =
  ({ photo }) =>
  async (dispatch, getState) => {
    try {
      updateProfile(auth.currentUser, {
        photoURL: photo,
      }).then(console.log("Updated photo"));

      dispatch(updateUserPhoto(photo));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export {
  authSignIn,
  authSignUp,
  authSignOut,
  authStateChanged,
  authUpdateProfile,
};
