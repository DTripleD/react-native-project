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
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import backImage from "../Source/Photo_BG.png";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUser } from "../Redux/auth/authSelectors";
import { useDispatch } from "react-redux";
import { fetchLoginUser, fetchCurrentUser } from "../Redux/auth/authOperations";
import { fetchGetAllPosts } from "../Redux/posts/postsOperations";

const LoginScreen = ({ navigation }) => {
  const logedIn = useSelector(selectIsAuth);

  useEffect(() => {
    if (logedIn) {
      navigation.navigate("Home", { screen: "PostList" });
    }
  }, []);

  //state
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [isShown, setIsShown] = useState(true);
  const [activeInput, setActiveInput] = useState(false);

  //redux
  const dispatch = useDispatch();

  const handleMail = (text) => {
    setMail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const register = () => {
    if (!mail || !password) {
      alert("Enter all data pleace!!!");
      return;
    }
    dispatch(fetchLoginUser({ mail, password })).then((result) => {
      if (result.type === "auth/fetchLoginUser/fulfilled") {
        navigation.navigate("Home", { screen: "PostList" });
        setMail("");
        setPassword("");
      } else {
        alert("Incorrect login!!!");
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.kav}
        keyboardVerticalOffset={-170}
      >
        <ImageBackground source={backImage} style={styles.backImg}>
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>

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
              onPress={() => {
                register();
              }}
            >
              <Text style={styles.registerButtonText}>Увійти</Text>
            </TouchableOpacity>

            <View style={styles.redirectWrapper}>
              <TouchableOpacity
                style={styles.loginLink}
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate("Registratione", {});
                  setMail("");
                  setPassword("");
                }}
              >
                <Text style={styles.loginLinkText}>
                  Немає акаунту?{" "}
                  <Text style={styles.underlingText}>Зареєструватися</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: "center",
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
    marginTop: -60,
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
  redirectWrapper: { alignItems: "center", marginTop: 10 },
});

export default LoginScreen;
