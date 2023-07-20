import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React, { useState } from "react";

const backImage = require("../../Source/Photo_BG.png");
import { useDispatch } from "react-redux";
import { fetchRegisterUser } from "../../Redux/auth/authOperations";
import { AntDesign } from "@expo/vector-icons";

const RegistrationScreen = ({ navigation, route }) => {
  const { photo } = route.params;
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);

  const handleLogin = (text) => {
    setLogin(text);
  };
  const handleMail = (text) => {
    setMail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const register = () => {
    if (!login || !mail || !password) {
      alert("Enter all data pleace!!!");
      return;
    }
    dispatch(fetchRegisterUser({ mail, password, login, photo })).then(
      (result) => {
        result.type === "auth/fetchRegisterUser/fulfilled" &&
          navigation.navigate("Home", { screen: "PostsScreen" });
        result.type !== "auth/fetchRegisterUser/fulfilled" &&
          alert("Incorrect registration!!!");
      }
    );
  };

  const takePhoto = () => {
    navigation.navigate("ProfilePhotoScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-170}
        style={styles.kav}
      >
        <ImageBackground source={backImage} style={styles.backImg}>
          <View style={styles.container}>
            <View style={styles.pfotoContainer}>
              {photo && (
                <Image source={{ uri: `${photo}` }} style={styles.photoProf} />
              )}
            </View>
            <TouchableOpacity
              style={styles.addbutton}
              activeOpacity={0.5}
              onPress={() => {
                takePhoto();
              }}
            >
              <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.title}>Реєстрація</Text>

            <TextInput
              style={styles.inputLogin}
              placeholder="Логін"
              inputMode="text"
              value={login}
              onChangeText={handleLogin}
            />
            <TextInput
              style={styles.inputMailPassw}
              placeholder="Адреса електронної пошти"
              inputMode="email"
              value={mail}
              onChangeText={handleMail}
            />
            <TextInput
              style={styles.inputMailPassw}
              placeholder="Пароль"
              secureTextEntry={isShown}
              value={password}
              onChangeText={handlePassword}
            />

            <TouchableOpacity
              style={styles.passwShow}
              activeOpacity={0.5}
              onPress={() => setIsShown(!isShown)}
            >
              <Text style={styles.passwShowText}>
                {isShown ? "Показати" : "Сховати"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              activeOpacity={0.5}
              onPress={register}
            >
              <Text style={styles.registerButtonText}>Зареєстуватися</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity
                style={styles.loginLink}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginLinkText}>
                  Немає акаунту?{" "}
                  <Text style={styles.underlingText}>Зареєструватися</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: "center",
  },
  photoProf: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignSelf: "center",
  },
  backImg: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  pfotoContainer: {
    position: "relative",
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
  },

  addbutton: {
    position: "absolute",
    left: "62%",
    top: 10,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwShow: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  underlingText: { textDecorationLine: "underline" },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
});

export default RegistrationScreen;
