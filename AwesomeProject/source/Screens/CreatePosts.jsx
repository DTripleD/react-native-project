import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPhoto } from "../Redux/storage/storageOperations";
import { fetchAddPost } from "../Redux/posts/postsOperations";
import { selectUserId } from "../Redux/auth/authSelectors";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePost = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [inputRegion, setInputRegion] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const uid = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      Location.getCurrentPositionAsync({})
        .then((locationPos) => {
          const coords = {
            latitude: locationPos.coords.latitude,
            longitude: locationPos.coords.longitude,
          };
          setLocation(coords);
          return coords;
        })
        .then((coords) => {
          return Location.reverseGeocodeAsync(coords);
        })
        .then((regionName) => setRegion(regionName))
        .catch((error) => console.log(error));
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    await setPhoto(photo.uri);
    if (region !== null) {
      setInputRegion(region[0]["country"] + ", " + region[0]["city"]);
    }
  };

  const clearData = () => {
    setTitle("");
    setPhoto(null);
    setInputRegion(null);
  };

  const hendleCreate = async () => {
    if (!photo) {
      alert("Make photo");
      return;
    }
    const { payload } = await dispatch(fetchUploadPhoto(photo));
    await dispatch(
      fetchAddPost({
        photo: payload,
        title,
        inputRegion,
        location,
        uid,
      })
    );

    clearData();
    navigation.navigate("PostList");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-140}
      style={styles.kav}
    >
      <View style={styles.conteiner}>
        <View style={styles.cameraWrapper}>
          <View style={styles.cameraView}>
            <Camera
              style={(styles.postImg, styles.conteiner_skeleton)}
              ref={setCamera}
            >
              {photo && <Image source={{ uri: photo }} style={styles.image} />}
            </Camera>
            <TouchableOpacity
              style={{
                ...styles.postImgAdd,
                backgroundColor: photo ? "#FFFFFF4D" : "#FFFFFF",
              }}
              activeOpacity={0.5}
              onPress={takePhoto}
            >
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={photo ? "#FFFFFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.photoText}>
            {!photo ? "Завантажте фото" : "Редагувати фото"}
          </Text>
        </View>

        <View style={styles.postForm}>
          <TextInput
            style={styles.postName}
            placeholder="Назва..."
            inputMode="text"
            onChangeText={setTitle}
            value={title}
          />
          <TextInput
            style={styles.postName}
            placeholder="Місцевість..."
            // inputMode="navigation"
            value={inputRegion}
            onChangeText={setInputRegion}
          />
          <TouchableOpacity
            style={photo ? styles.postButtonActive : styles.postButton}
            activeOpacity={0.5}
            onPress={hendleCreate}
          >
            <Text style={styles.postButtonText}>Опубліковати</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clearWrapper}>
          <TouchableOpacity style={styles.clear_conteiner} onPress={clearData}>
            <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    // paddingTop: 32,
    justifyContent: "space-between",
  },
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  postImg: {
    width: "100%",
    height: 600,
    color: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  postImgAdd: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -30 }, { translateX: -30 }],
    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 3,

    alignItems: "center",
    justifyContent: "center",
  },
  postImgText: {
    alignItems: "flex-start",
    color: "#fff",
  },
  postForm: {
    width: "100%",
  },
  postButton: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  postName: {
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },

  clear_conteiner: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },

  conteiner_skeleton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,

    height: 250,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoText: {
    alignSelf: "flex-start",
    color: "#BDBDBD",
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
  cameraWrapper: { width: "100%" },
  cameraView: {
    borderRadius: 8,
    overflow: "hidden",
    height: 240,
  },
  image: { height: "100%", width: "100%" },
  clearWrapper: { marginTop: "auto" },
});

export default CreatePost;
