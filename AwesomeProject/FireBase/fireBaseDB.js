import {
  getDatabase,
  ref,
  set,
  get,
  push,
  child,
  update,
  runTransaction,
} from "firebase/database";

const uploadPostOnDataBase = async (post) => {
  const db = getDatabase();
  const json = {
    name: post.name,
    info: post.input,
    location: post.location,
    photo: post.newPhoto,
    userId: post.userId,
  };

  const postListRef = ref(db, "posts");
  const newPostRef = push(postListRef);
  set(newPostRef, json);
};

const readDataPosts = () => {
  const dbRef = ref(getDatabase());

  return get(child(dbRef, `posts`));
};

const uploadComment = (comment, name, id, date, photo, userId) => {
  const db = getDatabase();

  const postListRef = ref(db, `posts/${id}/comment`);
  const newPostRef = push(postListRef);

  set(newPostRef, {
    name,
    comment,
    date,
    photo,
    userId,
  });
};

const readComment = (id) => {
  const dbRef = ref(getDatabase());

  return get(child(dbRef, `posts/${id}/comment`));
};

const readStarCount = (id) => {
  const dbRef = ref(getDatabase());

  return get(child(dbRef, `posts/${id}/starCount`));
};

const updatePost = (id, userId) => {
  const db = getDatabase();
  const postRef = ref(db, `posts/${id}/starCount`);

  const newPostRef = push(postRef);
  set(newPostRef, { userId, countLikes: 1 });
};

export {
  uploadPostOnDataBase,
  readDataPosts,
  uploadComment,
  readComment,
  updatePost,
  readStarCount,
};
