import React, { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

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
  StyleSheet,
} from "react-native";

import { ErrorText } from "../../components/ReUseComponents/ErrorText/ErrorText";

import { authSignIn } from "../../redux/auth/authOperations";
import { validateEmail, validationPassword } from "../../helpers";

const initialState = {
  email: "",
  password: "",
};

const reducerInput = (state, actions) => {
  switch (actions.type) {
    case "Email": {
      return { ...state, email: actions.payload };
    }
    case "Password": {
      return { ...state, password: actions.payload };
    }
    default: {
      return state;
    }
  }
};

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [input, setInput] = useState(initialState);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [isShown, setIsShown] = useState(true);

  const [isActive, setIsActive] = useState("");

  const [state, onDispatch] = useReducer(reducerInput, initialState);

  const dispatch = useDispatch();

  const [dimension, setDimension] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const handleLogin = () => {
    if (isValidEmail && isValidPassword && input.email) {
      Keyboard.dismiss();

      dispatch(authSignIn(input));

      setInput(() => initialState);
    } else {
      console.log("Empty fields");
    }
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
  });

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
            <Text style={styles.title}>Увійти</Text>

            <View style={{ width: "100%" }}>
              <View>
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
                    validationPassword(value, setIsValidPassword);
                    setInput((prev) => ({ ...prev, password: value }));
                  }}
                  name="password"
                />
                {!isValidPassword ? (
                  <ErrorText text="Password should be example (Xx2$xxxx) at 8 character!" />
                ) : (
                  ""
                )}
                <TouchableOpacity
                  style={styles.passwShow}
                  activeOpacity={0.5}
                  onPress={() => setIsShown(!isShown)}
                >
                  <Text style={styles.passwShowText}>
                    {isShown ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                disabled={!isValidPassword}
                style={styles.registerButton}
                onPress={handleLogin}
                activeOpacity={0.5}
              >
                <Text style={styles.registerButtonText}>Увійти</Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity
                  style={styles.loginLink}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.loginLinkText}>
                    Немає акаунту?{" "}
                    <Text style={styles.underlingText}>Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
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
    width: "100%",
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
  },
  passwShow: {
    top: -34,
    left: 275,
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
  pageWrapper: {
    flex: 1,
  },
  form: {
    // position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    // paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
  },
  kav: { flex: 1, width: "100%", justifyContent: "flex-end" },

  backImg: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default LoginScreen;
