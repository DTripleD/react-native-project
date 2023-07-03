import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadPhonoInStorage = async (photo) => {
  try {
    const resp = await fetch(photo).then((res) => res.blob());

    const storage = getStorage();
    const uniqueIdImage = Date.now().toString();

    const storageRef = ref(storage, `Images/${uniqueIdImage}`);

    await uploadBytes(storageRef, resp);

    return getDownloadURL(storageRef);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

export { uploadPhonoInStorage };
