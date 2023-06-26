import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";

const LoginScreen = ({ setIsRegister }) => {
  const [inputColorEmail, setInputColorEmail] = useState("#F6F6F6");
  const [borderColorEmail, setBorderColorEmail] = useState("#E8E8E8");
  const [inputColorPassword, setInputColorPassword] = useState("#F6F6F6");
  const [borderColorPassword, setBorderColorPassword] = useState("#E8E8E8");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(true);

  const onLogin = () => {
    console.log(`Email:${email}`, `Password: ${password}`);
    Alert.alert(`Email:${email}`, `Password: ${password}`);
  };

  const wasRegistered = () => {
    setIsRegister(false);
  };

  const onFocusEmail = () => {
    setInputColorEmail("#FFFFFF");
    setBorderColorEmail("#FF6C00");
  };

  const onBlurEmail = () => {
    setInputColorEmail("#F6F6F6");
    setBorderColorEmail("#E8E8E8");
  };

  const onFocusPassword = () => {
    setInputColorPassword("#FFFFFF");
    setBorderColorPassword("#FF6C00");
  };

  const onBlurPassword = () => {
    setInputColorPassword("#F6F6F6");
    setBorderColorPassword("#E8E8E8");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Увійти</Text>

        <TextInput
          style={[
            styles.inputMailPassw,
            {
              backgroundColor: inputColorEmail,
              borderColor: borderColorEmail,
            },
          ]}
          placeholder="Адреса електронної пошти"
          inputMode="email"
          onBlur={onBlurEmail}
          onFocus={onFocusEmail}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.inputMailPassw,
            {
              backgroundColor: inputColorPassword,
              borderColor: borderColorPassword,
            },
          ]}
          placeholder="Пароль"
          secureTextEntry={isShown}
          onBlur={onBlurPassword}
          onFocus={onFocusPassword}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.passwShow}
          activeOpacity={0.5}
          onPress={() => setIsShown(isShown === true ? false : true)}
        >
          <Text style={styles.passwShowText}>Показати</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.5}
          onPress={onLogin}
        >
          <Text style={styles.registerButtonText}>Увійти</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          activeOpacity={0.5}
          onPress={wasRegistered}
        >
          <Text style={styles.loginLinkText}>
            Немає акаунту?{" "}
            <Text style={styles.underlingText}>Зареєструватися</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 30,
  },
  containerKeyB: {},
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
});

export default LoginScreen;
