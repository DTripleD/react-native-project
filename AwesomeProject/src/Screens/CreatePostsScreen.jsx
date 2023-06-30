import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [postName, setPostName] = useState("");
  const [locationTitle, setLocationTitle] = useState(null);
  const [postLocation, setPostLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [type] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        let location = await Location.getLastKnownPositionAsync();

        if (!location) {
          location = await Location.getCurrentPositionAsync({});
        }

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setPostLocation(coords);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [photoUri]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasPermission(status === "granted");
      } catch (error) {
        console.log(error);
      }
    })();

    return handleReset;
  }, []);

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const handleSubmit = async () => {
    if (!photoUri) {
      setPhotoUri("");
      return;
    }
    if (!postLocation) {
      try {
      } catch (error) {
        console.log(error);
      }
      return;
    }
    navigation.navigate("PostsScreen");

    handleReset();
  };

  const handleReset = () => {
    setPostName(null);
    setLocationTitle(null);
    setPostLocation(null);
    setPhotoUri("");
  };

  const isButtonDisabled = photoUri;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-60}
      >
        <View style={styles.container}>
          <View style={styles.loadImage}>
            <Camera type={type} ref={cameraRef} style={{ flex: 1 }}>
              <ImageBackground src={photoUri} style={styles.postImage}>
                <TouchableOpacity
                  onPress={async () => {
                    setPhotoUri(null);
                    if (cameraRef) {
                      const { uri } =
                        await cameraRef.current.takePictureAsync();
                      await MediaLibrary.createAssetAsync(uri);
                      setPhotoUri(uri);
                    }
                  }}
                  style={styles.cameraIconWrapper}
                >
                  <Ionicons
                    name={"camera-sharp"}
                    size={24}
                    color={"#BDBDBD"}
                    style={styles.cameraIcon}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </Camera>
          </View>
          <Text style={styles.photoText}>
            {!photoUri ? "Завантажте фото" : "Редагувати фото"}
          </Text>

          <TextInput
            style={styles.inputName}
            placeholder="Назва..."
            onChangeText={setPostName}
            value={postName}
          />
          <View style={styles.searchSection}>
            <Ionicons
              name={"location-outline"}
              size={24}
              color={"#BDBDBD"}
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.inputPlace}
              placeholder="Місцевість..."
              onChangeText={setLocationTitle}
              value={locationTitle}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.registerButton,
              isButtonDisabled && styles.enabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!isButtonDisabled}
            activeOpacity={0.5}
          >
            <Text
              style={[
                styles.registerButtonText,
                isButtonDisabled && styles.publishButtonTextEnabled,
              ]}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.5}
            onPress={handleReset}
          >
            <Ionicons name={"trash-outline"} size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  photoText: { alignSelf: "flex-start", color: "#BDBDBD" },
  container: {
    height: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    alignItems: "center",
    // justifyContent: "flex-end",
  },
  ovalContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: "100%",
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
  },
  oval: {
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginTop: 16,
  },
  searchIcon: {
    // padding: 10,
  },
  inputPlace: {
    padding: 16,
    paddingLeft: 4,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
  },
  inputName: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    padding: 16,
    paddingLeft: 0,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  registerButton: {
    backgroundColor: "#F6F6F6",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 32,
  },
  registerButtonText: {
    color: "#BDBDBD",
    fontWeight: "400",
  },
  deleteButton: {
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingLeft: 23,
    paddingRight: 23,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: "auto",
  },
  screenWrapper: { flex: 1, width: "100%", justifyContent: "flex-end" },
  loadImage: {
    position: "relative",
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#f6f6f6",
    marginBottom: 8,
    overflow: "hidden",
  },
  postImage: {
    flex: 1,
    backgroundColor: "transparent",
  },
  cameraIconWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF4D",
    borderRadius: 30,
    transform: [{ translateY: -30 }, { translateX: -30 }],
  },
  cameraIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -13 }, { translateX: -12 }],
  },
  actionDescription: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  input: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 16,
  },
  locationInputWrapper: {
    position: "relative",
    marginBottom: 32,
  },
  locationInput: {
    paddingLeft: 28,
    marginBottom: 0,
  },
  enabledButton: {
    backgroundColor: "#FF6C00",
  },
  publishButtonTextEnabled: {
    color: "#ffffff",
  },
});

export default CreatePostScreen;
