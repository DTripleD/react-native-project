import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
// icons

import {
  ImageBackground,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";

// FIREBASE
// import { authSignUp } from "../../redux/auth/authOperations";
// FIREBASE
// API
import { SignInUser } from "../../api/auth/signin";

import { saveUserProfile, stateChangeUser } from "../../redux/auth/authSlice";
// API

import {
  validateName,
  validateEmail,
  validationPassword,
  reducerInput,
} from "../../helpers";
// components

import { AddButtonPhoto } from "../../components/ReUseComponents/AddRemoveButtonPhoto/AddPhoto";
import { RemoveButtonPhoto } from "../../components/ReUseComponents/AddRemoveButtonPhoto/RemovePhoto";
import { ErrorText } from "../../components/ReUseComponents/ErrorText/ErrorText";
import { authSignUp } from "../../redux/auth/authOperations";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const initSignInUser = new SignInUser();

const RegistrationsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [input, setInput] = useState(initialState);
  const [image, setImage] = useState(null);

  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [isShown, setIsShown] = useState(true);

  const [isActive, setIsActive] = useState("");

  const [state, onDispatch] = useReducer(reducerInput, initialState);

  const dispatch = useDispatch();

  const statee = useSelector((state) => state.verify);
  console.log(statee);
  const handleSubmit = () => {
    if (isValidName && isValidEmail && isValidPassword && input.email) {
      // firebase actions
      dispatch(authSignUp({ ...input, photo: image }));
      // firebase actions

      // api actions
      // initSignInUser
      //   .createUser({ ...input, photo: image })
      //   .then(
      //     ({
      //       username: displayName,
      //       id: uid,
      //       email,
      //       avatarUrl: photoURL,
      //       token,
      //     }) => {
      //       dispatch(
      //         saveUserProfile({ displayName, uid, email, photoURL, token })
      //       );
      //     }
      //   );
      // api actions

      setInput(() => initialState);
    } else {
      console.log("empty field");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-170}
        style={styles.kav}
      >
        <ImageBackground
          source={require("../../assets/img/bg-photo.png")}
          style={styles.backImg}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.form}>
            <View style={styles.photoContainer}>
              {!image ? (
                <AddButtonPhoto setImage={setImage} />
              ) : (
                <RemoveButtonPhoto />
              )}

              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%", borderRadius: 16 }}
                />
              )}
            </View>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={{ alignItems: "center" }}>
              <View style={{ width: "100%" }}>
                <TextInput
                  style={[
                    styles.inputMailPassw,
                    isActive === "login" && styles.inputMailPasswa,
                  ]}
                  placeholder="Логін"
                  onBlur={() => {
                    setIsActive("");
                    onDispatch({ type: "username", payload: false });
                  }}
                  value={input.username}
                  onFocus={() => {
                    onDispatch({ type: "username", payload: true });
                    setIsActive("login");
                  }}
                  name="login"
                  onChangeText={(value) => {
                    validateName(value, setIsValidName);
                    setInput((prev) => ({ ...prev, username: value }));
                  }}
                />

                {!isValidName ? (
                  <ErrorText text="Name is required and at least 8 characters!" />
                ) : (
                  ""
                )}
              </View>

              <View style={{ width: "100%" }}>
                <TextInput
                  style={[
                    styles.inputMailPassw,
                    isActive === "email" && styles.inputMailPasswa,
                  ]}
                  placeholder="Адреса електронної пошти"
                  onBlur={() => {
                    setIsActive("");
                    onDispatch({ type: "Email", payload: false });
                  }}
                  inputMode="email"
                  value={input.email}
                  onFocus={() => {
                    onDispatch({ type: "Email", payload: true });
                    setIsActive("email");
                  }}
                  onChangeText={(value) => {
                    validateEmail(value, setIsValidEmail);
                    setInput((prev) => ({ ...prev, email: value }));
                  }}
                  name="email"
                />
                {!isValidEmail ? <ErrorText text="Email invalid!" /> : ""}
              </View>
              <View style={{ width: "100%" }}>
                <TextInput
                  style={[
                    styles.inputMailPassw,
                    isActive === "password" && styles.inputMailPasswa,
                  ]}
                  placeholder="Пароль"
                  passwordRules={{ minlenght: 8 }}
                  onBlur={() => {
                    setIsActive("");
                    onDispatch({ type: "Password", payload: false });
                  }}
                  secureTextEntry={isShown}
                  value={input.password}
                  onFocus={() => {
                    onDispatch({ type: "Password", payload: true });
                    setIsActive("password");
                  }}
                  onChangeText={(value) => {
                    setInput((prev) => ({ ...prev, password: value }));
                    validationPassword(value, setIsValidPassword);
                  }}
                  name="password"
                />

                {!isValidPassword ? (
                  <ErrorText text="Password should be example (Xx2$xxxx) at 8 character!" />
                ) : (
                  ""
                )}
              </View>
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
                touchSoundDisabled={true}
                disabled={!isValidPassword}
                style={styles.registerButton}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
                <Text style={styles.registerButtonText}>Зареєстуватися</Text>
              </TouchableOpacity>
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

export default RegistrationsScreen;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 30,
  },
  photoContainer: {
    marginTop: -90,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addbutton: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
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
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  inputMailPasswa: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
  },
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    paddingRight: 16,
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

  form: {
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // marginBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
  },
  pageWrapper: {
    flex: 1,
  },
  conteinerImg: {
    position: "absolute",
    left: "35%",
    width: 120,
    height: 120,
    zIndex: 1,
    borderRadius: 16,
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },
  backImg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "flex-end",
  },
});
