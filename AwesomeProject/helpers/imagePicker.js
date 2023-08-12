import * as ImagePicker from "expo-image-picker";

const getImageFromGallery = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    return result.assets[0].uri;
  } catch (error) {
    console.log(error);
  }
};
export { getImageFromGallery };
