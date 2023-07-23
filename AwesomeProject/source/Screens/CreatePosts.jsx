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
  const [photoi, setPhoto] = useState(null);
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
        .catch();
    })();
  }, []);

  const active = title && region;

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setInputRegion(region[0]["country"] + ", " + region[0]["city"]);
  };

  const clearData = () => {
    setTitle("");
    setPhoto(null);
    setInputRegion("");
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

    clearData();
    navigation.navigate("PostList");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-140}
        style={styles.kav}
      >
        <SafeAreaView style={styles.conteiner}>
          <View>
            <View
              style={{
                borderRadius: 8,
                overflow: "hidden",
                height: 240,
              }}
            >
              <Camera
                style={(styles.postImg, styles.conteiner_skeleton)}
                ref={setCamera}
              >
                <Image
                  source={{ uri: photoi }}
                  style={{ height: "100%", width: "100%" }}
                />
              </Camera>
            </View>

            <TouchableOpacity
              style={{
                ...styles.postImgAdd,
                backgroundColor: photoi ? "#FFFFFF4D" : "#FFFFFF",
              }}
              activeOpacity={0.5}
              onPress={takePhoto}
            >
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={photoi ? "#FFFFFF" : "#BDBDBD"}
              />
            </TouchableOpacity>
            <Text style={styles.photoText}>
              {!photoi ? "Завантажте фото" : "Редагувати фото"}
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
              onPress={clearData}
            >
              <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    // paddingTop: 32,
  },
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  postImg: {
    // flex: 3,
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
    transform: [{ translateY: -40 }, { translateX: -50 }],

    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 3,
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
    marginBottom: 40,
  },

  conteiner_skeleton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: 343,
    height: 250,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoText: {
    alignSelf: "flex-start",
    color: "#BDBDBD",
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
});

export default CreatePost;
