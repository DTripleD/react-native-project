import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

export const selectAllPosts = (store) => store.posts.posts;
export const selectAuthUid = (store) => store.auth.uid;
// export const selectAuthPosts = (store) => {
//   return store.posts.posts?.filter((item) => item.uid === store.auth.uid);
// };

export const selectAuthPosts = createSelector(
  [selectAllPosts, selectAuthUid],
  (allPosts, authUid) => {
    if (!allPosts || !authUid) {
      return [];
    }
    return allPosts.filter((item) => item.uid === authUid);
  }
);
