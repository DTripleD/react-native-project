import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import FormPost from "../../components/FormPost/FormPost";
import { ImageBackground } from "react-native";

const PostsScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  // premissions state

  const [type, setType] = useState(CameraType.back);
  const [photo, setphoto] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postLocation, setPostLocation] = useState(null);

  const cameraRef = useRef(null);

  console.log(photo);

  const takeSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };

      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      setphoto(source);

      console.log(source);

      if (source) {
        cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();

    setIsPreview(false);
  };

  const toggleCamera = () =>
    setType((prev) =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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
  }, [photo]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.conteiner}>
        <Camera
          ref={cameraRef}
          type={type}
          style={styles.conteiner_skeleton}
          onCameraReady={() => setCameraReady(true)}
          onMountError={(error) => {
            console.log("camera error", error);
          }}
        >
          <TouchableOpacity
            onPress={takeSnap}
            delayLongPress={500}
            onLongPress={toggleCamera}
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

        <Text style={styles.photoText}>
          {!photo ? "Завантажте фото" : "Редагувати фото"}
        </Text>

        <View style={styles.loadImage}>
          {hasPermission ? (
            <Camera type={type} ref={cameraRef} style={{ flex: 1 }}>
              <ImageBackground src={photo} style={styles.postImage}>
                {photo ? (
                  <TouchableOpacity
                    disabled={loading}
                    onPress={async () => {
                      setLoading(true);
                      setphoto(null);
                      setLoading(false);
                    }}
                    style={[
                      styles.cameraIconWrapper,
                      styles.cameraIconWrapperHasntPerm,
                    ]}
                  >
                    <Ionicons
                      name={"camera-sharp"}
                      size={24}
                      color={"#BDBDBD"}
                      style={styles.cameraIcon}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      disabled={loading}
                      onPress={async () => {
                        setLoading(true);
                        setphoto(null);
                        if (cameraRef) {
                          const { uri } =
                            await cameraRef.current.takePictureAsync();
                          await MediaLibrary.createAssetAsync(uri);
                          setphoto(uri);
                        }
                        setLoading(false);
                      }}
                      style={styles.cameraIconWrapper}
                    >
                      {loading ? (
                        <ActivityIndicator size="large" style={styles.loader} />
                      ) : (
                        <Ionicons
                          name={"camera-sharp"}
                          size={24}
                          color={"#BDBDBD"}
                          style={styles.cameraIcon}
                        />
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </ImageBackground>
            </Camera>
          ) : (
            <TouchableOpacity
              style={[
                styles.cameraIconWrapper,
                styles.cameraIconWrapperHasntPerm,
              ]}
            >
              <Ionicons
                name={"camera-sharp"}
                size={24}
                color={"#BDBDBD"}
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        <FormPost
          navigation={navigation}
          photo={photo}
          onPress={cancelPreview}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  text_addPhotot: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,

    marginRight: "auto",
    marginLeft: 24,
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
  text_addPhotot: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,

    marginRight: "auto",
    marginLeft: 24,
  },
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
  loader: { height: "100%" },
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
  cameraIconWrapperHasntPerm: { backgroundColor: "#FFFFFF" },
  cameraIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -13 }, { translateX: -12 }],
  },
  photoText: { alignSelf: "flex-start", color: "#BDBDBD" },
});
