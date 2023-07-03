import * as ImagePicker from "expo-image-picker";

const getImageFromGallery = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  return result.assets[0].uri;
};
export { getImageFromGallery };
