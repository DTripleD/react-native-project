import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPhoto } from "../../Redux/storage/storageOperations";
import { fetchAddPost } from "../../Redux/posts/postsOperations";
import { selectUserId } from "../../Redux/auth/authSelectors";

const CreatePost = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photoi, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [inputRegion, setInputRegion] = useState("");
  const [title, setTitle] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const cameraRef = useRef(null);

  const dispatch = useDispatch();

  const uid = useSelector(selectUserId);

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();

    setIsPreview(false);
  };

  const hanldeClearSubmit = () => {
    setInputRegion("");
    setTitle("");
    setIsPreview(false);
    setLocation(null);
    setRegion(null);
    setCamera(null);
  };

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
        .catch();
    })();
  }, []);

  const active = title && region;

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setInputRegion(region[0]["country"] + ", " + region[0]["city"]);
  };

  const inputTitlte = (text) => {
    setTitle(text);
  };

  const hendleCreate = async () => {
    if (!title || !location || !photoi) {
      alert("Enter all data pleace!!!");
      return;
    }
    const { payload } = await dispatch(fetchUploadPhoto(photoi));
    await dispatch(
      fetchAddPost({ photo: payload, title, inputRegion, location, uid })
    );
    navigation.navigate("PostList");
  };

  return (
    <View style={styles.postContainer}>
      <Camera
        ref={setCamera}
        // type={type}
        style={styles.conteiner_skeleton}
      >
        <TouchableOpacity
          onPress={takePhoto}
          delayLongPress={500}
          // onLongPress={toggleCamera}
          // disabled={!cameraReady}
        >
          {!isPreview && (
            <View style={styles.conteiner_addPhoto}>
              <MaterialIcons name="photo-camera" size={24} color="#fff" />
            </View>
          )}
          {isPreview && (
            <Ionicons
              onPress={cancelPreview}
              name="close-circle-sharp"
              size={44}
              style={{ opacity: 0.5 }}
              color="black"
            />
          )}
        </TouchableOpacity>
      </Camera>

      <View style={styles.postForm}>
        <TextInput
          style={styles.postName}
          placeholder="Назва..."
          inputMode="text"
          onChangeText={inputTitlte}
        />
        <TextInput
          style={styles.postName}
          placeholder="Місцевість..."
          inputMode="navigation"
          value={inputRegion}
        />
        <TouchableOpacity
          style={active ? styles.postButtonActive : styles.postButton}
          activeOpacity={0.5}
          onPress={hendleCreate}
        >
          <Text style={styles.postButtonText}>Опубліковати</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clear_conteiner}
          onPress={hanldeClearSubmit}
        >
          <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  postImg: {
    flex: 3,
    width: "100%",
    height: 600,
    color: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  postImgAdd: {
    display: "flex",
    marginTop: -80,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
    borderColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  postImgText: {
    alignItems: "flex-start",
    color: "#fff",
  },
  postForm: {
    flex: 3,
  },
  postButton: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
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
    width: 343,
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
  conteiner_skeleton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 343,
    height: 250,
  },
  conteiner_addPhoto: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  clear_conteiner: {
    marginTop: 65,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default CreatePost;
