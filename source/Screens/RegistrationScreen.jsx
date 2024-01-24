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

const backImage = require("../Source/Photo_BG.png");
import { useDispatch } from "react-redux";
import { fetchRegisterUser } from "../Redux/auth/authOperations";
import { AntDesign } from "@expo/vector-icons";

const RegistrationScreen = ({ navigation, route }) => {
  const { photo } = route.params;
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);
  const [activeInput, setActiveInput] = useState(false);

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
    dispatch(
      fetchRegisterUser({
        mail,
        password,
        login,
        photo:
          "https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57",
      })
    )
      .then((result) => {
        if (password.length < 6) {
          return alert("Пароль має бути не менше 6 символів");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
          return alert("Введіть почту у правильному форматі");
        }
        result.type === "auth/fetchRegisterUser/fulfilled" &&
          navigation.navigate("Home", { screen: "PostList" });
        result.type !== "auth/fetchRegisterUser/fulfilled" &&
          alert("Така почта вже існує");
      })
      .catch((error) => console.log(error));
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
            <View style={styles.photoContainer}>
              {photo && (
                <Image source={{ uri: `${photo}` }} style={styles.photoProf} />
              )}
            </View>
            <TouchableOpacity
              style={photo ? styles.deleteButton : styles.addbutton}
              activeOpacity={0.5}
              onPress={() => {
                takePhoto();
              }}
            >
              <AntDesign
                name="pluscircleo"
                size={24}
                color={photo ? "#BDBDBD" : "#FF6C00"}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Реєстрація</Text>

            <TextInput
              autoCapitalize="none"
              style={[
                styles.inputLogin,
                activeInput === "login" && styles.inputActive,
              ]}
              placeholder="Логін"
              inputMode="text"
              value={login}
              onChangeText={handleLogin}
              onFocus={() => setActiveInput("login")}
              onBlur={() => setActiveInput(false)}
            />
            <TextInput
              autoCapitalize="none"
              style={[
                styles.inputMailPassw,
                activeInput === "email" && styles.inputActive,
              ]}
              placeholder="Адреса електронної пошти"
              inputMode="email"
              value={mail}
              onChangeText={handleMail}
              onFocus={() => setActiveInput("email")}
              onBlur={() => setActiveInput(false)}
            />
            <TextInput
              autoCapitalize="none"
              style={[
                styles.inputMailPassw,
                activeInput === "password" && styles.inputActive,
              ]}
              placeholder="Пароль"
              secureTextEntry={isShown}
              value={password}
              onChangeText={handlePassword}
              onFocus={() => setActiveInput("password")}
              onBlur={() => setActiveInput(false)}
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

            <View style={styles.redirect}>
              <TouchableOpacity
                style={styles.loginLink}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginLinkText}>
                  Вже є акаунт? <Text style={styles.underlingText}>Увійти</Text>
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
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  photoContainer: {
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
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  deleteButton: {
    position: "absolute",
    left: "62%",
    top: 10,
    pointerEvents: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    transform: [{ rotate: "45deg" }],
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  inputActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
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
    width: "100%",
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
  redirect: { alignItems: "center", marginTop: 10 },
});

export default RegistrationScreen;
