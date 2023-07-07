import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// icons
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import * as Location from "expo-location";

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { uploadPhonoInStorage, uploadPostOnDataBase } from "../../FireBase";
import { isUpdate } from "../../redux/post/postSlice";

const initialState = {
  title: "",
  location: "",
};

const FormPost = ({ navigation, photo, cancelPrev }) => {
  const [input, setInput] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [location, setLocation] = useState(null);
  // hooks
  const { userId, name } = useSelector((state) => state.verify);
  const dispatch = useDispatch();
  //
  // width
  const [dimension, setDimension] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const handleLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const hanldeClearSubmit = () => {
    setInput(initialState);
    cancelPrev();
  };

  const onHandleSubmit = async () => {
    dispatch(isUpdate());
    // upload file in storage
    const newPhoto = await uploadPhonoInStorage(photo);
    // upload post on DB
    uploadPostOnDataBase({
      input,
      newPhoto,
      location: location.coords,
      userId,
      name,
    });

    setInput(initialState);

    navigation.navigate("Home", "wd");
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <View style={{ ...styles.form, width: dimension - 20 * 2 }}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          onFocus={() => setIsShowKeyboard(true)}
          value={input.title}
          onChangeText={(value) =>
            setInput((prev) => ({ ...prev, title: value }))
          }
        />
      </View>
      <View style={{ position: "relative" }}>
        <Feather
          style={{ position: "absolute", top: 15, left: 0 }}
          name="map-pin"
          size={18}
          color="#BDBDBD"
        />
        <TextInput
          style={{ ...styles.input, paddingLeft: 24 }}
          placeholder="Місцевість..."
          onFocus={() => setIsShowKeyboard(true)}
          onPressOut={handleLocation}
          value={input.location}
          onChangeText={(value) =>
            setInput((prev) => ({ ...prev, location: value }))
          }
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
        <Text style={styles.buttonText}>Опубліковати</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.clear_conteiner}
        onPress={hanldeClearSubmit}
      >
        <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

export default FormPost;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    flexDirection: "column",
    marginTop: 30,
    paddingBottom: 20,
  },
  input: {
    marginBottom: 32,
    backgroundColor: "transparent",
    borderColor: "#e8e8e8",
    color: "#212121",
    textAlign: "left",
    padding: Platform.OS === "ios" ? 14 : 10,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    borderBottomWidth: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 15,
    padding: 16,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
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
