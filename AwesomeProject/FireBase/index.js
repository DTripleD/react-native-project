import { auth } from "./config";
import {
  uploadPostOnDataBase,
  readDataPosts,
  readComment,
  uploadComment,
  updatePost,
  readStarCount,
} from "./fireBaseDB";

import { uploadPhonoInStorage } from "./fireBaseStorage";

export {
  auth,
  uploadPhonoInStorage,
  uploadPostOnDataBase,
  readDataPosts,
  readComment,
  updatePost,
  uploadComment,
  readStarCount,
};
